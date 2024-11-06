import {
  BackBtn,
  Fields,
  FormGroup,
  GroupHeading,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import {
  useCreateTerritory,
  useGetAllTerritoryCategories,
  useGetTerritoryDetails,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import scriptLoader from "react-async-script-loader";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { PATH_ADMIN } from "../../../routes/paths";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";
import { useGetLgaByStateName } from "../../../hooks/useQueries/useIdentity";
import AddressInfoFormGroup from "../../../components/globalcomponents/globalformgroups/AddressInformation";

const TerritoriesSetup = ({ isScriptLoadSucceed }) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  const inputNames = {
    addressName: "headquaterAddress",
    stateName: "stateName",
    lgaName: "lgaName",
    cityName: "cityName",
  };

  const { values, touched, errors, handleBlur, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        headquaterAddress: "",
        stateName: "",
        lgaName: "",
        cityName: "",
        tcID: 0,
      },
    });

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  useEffect(() => {
    if (addressComponents.latitude) {
      setFieldValue("headquaterAddress", inputRef?.current?.value);
      setFieldValue("stateName", addressComponents.state);
      setFieldValue("lgaName", addressComponents.lga);
      setFieldValue("cityName", addressComponents.city);
    }
  }, [addressComponents.latitude]);

  // Mutation callback functions
  const onCreateSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate(PATH_ADMIN.territoryInfo(response.data.territoryId));
  };
  const onCreateError = (error) => {
    enqueueSnackbar(error.message, { variant: "failure" });
  };

  const { mutate: createTerritory, isLoading: isSubmitting } =
    useCreateTerritory(onCreateSuccess, onCreateError);

  // useQuery get and mutate hooks
  const { data: territoryData } = useGetTerritoryDetails(id);
  const { data: tcData } = useGetAllTerritoryCategories({});
  const { data: lgaData } = useGetLgaByStateName(values.stateName);

  const territoryCategories = tcData?.data?.territoryCategories?.map((cat) => ({
    id: cat.id,
    name: cat.categoryName,
  }));

  const setupTerritory = () => {
    const lgaId = lgaData?.data.filter(
      (lga) => lga.name === values.lgaName
    )?.[0].id;
    const payload = {
      name: values.name,
      headquaterAddress: values.headquaterAddress,
      latitude: addressComponents.latitude,
      longitude: addressComponents.longitude,
      lgaID: lgaId,
      tcID: +values.tcID,
    };

    createTerritory(payload);
  };

  useEffect(() => {
    if (territoryData?.territoryName) {
      setFieldValue("name", territoryData.territoryName);
      setFieldValue("tcID", territoryData.tcID);
      setFieldValue("headquaterAddress", territoryData.headquaterAddress);
    }
  }, [territoryData?.territoryName]);

  return (
    <>
      <div className="mb-5">
        <PageHeading>Setup Territory</PageHeading>
        <BackBtn />
      </div>

      <Fields>
        <GroupHeading>Territory Information</GroupHeading>
        <FormGroup columns="2" mb="24px">
          <GlobalInput
            labelText="Territory Name"
            inputName="name"
            inputValue={values.name}
            handleChange={handleChange}
            error={touched.name && errors.name}
            errorMessage={errors.name}
            required
          />
          <GlobalSelect
            labelText={"Territory Category"}
            selectName="tcID"
            selectValue={values.tcID}
            handleChange={handleChange}
            options={!!territoryCategories?.length ? territoryCategories : []}
            error={errors.tcID && touched.tcID}
            errorMessage={errors.tcID}
            required
          />
        </FormGroup>
        <AddressInfoFormGroup
          addressLabel="Enter territory central address"
          inputRef={inputRef}
          inputNames={inputNames}
          formikHandlers={formikHandlers}
          addressName={"headquaterAddress"}
          title="Territory Address"
        />
      </Fields>

      <GlobalBtn mx="auto" onClick={setupTerritory} disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : id ? "Save" : "Setup"}
      </GlobalBtn>
    </>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  TerritoriesSetup
);
