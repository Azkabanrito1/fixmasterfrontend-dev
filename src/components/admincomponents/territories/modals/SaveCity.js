import { useEffect, useRef } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import scriptLoader from "react-async-script-loader";
import { useFormik } from "formik";
import GlobalInput, { InputGroup } from "../../../globalcomponents/GlobalInput";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";
import {
  useCreateAddressOnRequest,
  useGetLgaByStateName,
  useGetStates,
} from "../../../../hooks/useQueries/useIdentity";
import { stringComparator } from "../../../../utils/utilityFxns";
import { FormGroup } from "../../../globalcomponents/Utilities";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";

const SaveCity = ({
  isOpen,
  closeModal,
  isScriptLoadSucceed,
  openAddCities,
}) => {
  // =======================hooks======================
  const inputRef = useRef(null);
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);
  const { enqueueSnackbar } = useSnackbar();

  // ======================mutations====================
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
    openAddCities();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: createAddressEntry } = useCreateAddressOnRequest(
    onSuccess,
    onError
  );

  const onSubmit = (values) => {
    const payload = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };

    createAddressEntry(payload);
  };

  const { values, errors, touched, setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        state: "",
        lga: "",
        city: "",
        cityId: "",
        address: "",
      },
      onSubmit,
    });

  useEffect(() => {
    const { state, lga, city, cityIdResult } = addressComponents;

    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setFieldValue("cityId", cityIdResult);
      setFieldValue("address", inputRef.current.value);
    }
  }, [addressComponents]);

  // ====================fetching data====================
  const { data: statesData } = useGetStates({
    refetchOnWindowFocus: false,
  });
  const { data: lgaData, refetch: fetchLga } = useGetLgaByStateName(
    values.state,
    { enabled: !!values.state }
  );

  // =====================use effects==================
  useEffect(() => {
    if (values.state) {
      fetchLga();
    }
  }, [values.state]);

  // =======================actions=====================
  const allStates = stringComparator(statesData?.data);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Save New City" closeModal={closeModal} mb="0" />

      <form onSubmit={handleSubmit}>
        <InputGroup labelColor="var(--clr-primary)" className="mb-4">
          <label htmlFor="address">Enter An Address*</label>
          <div className="input-block">
            <input
              className={errors.address && touched.address ? "invalid" : ""}
              type="text"
              id="address"
              name="address"
              defaultValue={values.address}
              placeholder="Enter an address"
              ref={inputRef}
            />
          </div>
        </InputGroup>

        <FormGroup columns="3" className="mb-4">
          <GlobalSelect
            labelColor={"var(--clr-primary)"}
            labelText={"State"}
            defaultOption={"Select a State"}
            selectName={"state"}
            selectValue={values.state}
            options={allStates}
            handleChange={handleChange}
            valueType={"string"}
            error={errors.state && touched.state}
            errorMessage={errors.state}
            required={true}
          />
          <GlobalSelect
            labelColor={"var(--clr-primary)"}
            labelText={"LGA"}
            defaultOption={"Select a LGA"}
            selectName={"lga"}
            selectValue={values.lga}
            options={lgaData?.data || []}
            handleChange={handleChange}
            valueType={"string"}
            error={errors.lga && touched.lga}
            errorMessage={errors.lga}
            required={true}
          />
          <GlobalInput
            labelColor={"var(--clr-primary)"}
            labelText={"City"}
            inputPlaceholder={"City"}
            inputName={"city"}
            inputValue={values.city}
            handleChange={handleChange}
            error={errors.city && touched.city}
            errorMessage={errors.city}
            required={true}
          />
        </FormGroup>

        <GlobalBtn type="submit" mx="auto">
          Save
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(SaveCity);
