import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useCheckCityExistence } from "../../../../hooks/useQueries/useAdmin";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import GlobalInput, { FieldError } from "../../../globalcomponents/GlobalInput";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { addCityValidation } from "../../../../Validations/addCityValidation";
import { getToday } from "../../../../utils/dateRanges";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import GlobalAltBtn from "../../../globalcomponents/GlobalAltBtn";
import { Stack } from "@mui/material";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import {
  useGetCitiesByLga,
  useGetLgaByStateId,
  useGetStates,
} from "../../../../hooks/useQueries/useIdentity";
import { stringComparator } from "../../../../utils/utilityFxns";
// import { format } from "date-fns";

const AddCity = ({
  selectedInfo,
  newlyAddedInfo,
  isOpen,
  closeModal,
  existingCities,
  setNewCities,
  // countryId,
  newlyAdded = [],
  openSaveCity,
}) => {
  const [selected, setSelected] = useState({});
  const [cities, setCities] = useState([]);

  const today = getToday();
  const onSubmit = () => {
    let endTime = !!values.endtime ? values.endtime : "23:59";

    setNewCities((prev) => [
      ...prev,
      {
        ...selected,
        startDate: values.start,
        endDate: !!values.end ? `${values.end}T${endTime}` : "",
      },
    ]);
    closeModal();
  };

  const {
    errors,
    touched,
    handleBlur,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      stateId: "",
      lgaId: "",
      city: 0,
      start: "",
      end: "",
      endtime: "",
    },
    onSubmit,
    validationSchema: addCityValidation,
  });

  // fetching data
  const { data: states } = useGetStates();
  const { data: lgas } = useGetLgaByStateId(values.stateId, {
    enabled: !!values.stateId,
  });
  const { data: cityOpts, isLoading: loadingCities } = useGetCitiesByLga(
    values.lgaId,
    {
      enabled: !!values.lgaId,
    }
  );

  // handling response from mutations
  useEffect(() => {
    const existing = [...existingCities, ...newlyAdded];
    // remove all existing cities from the response
    const selectedIds = existing.map((city) => city.cityId || city.id);
    const unselectedCities = cityOpts?.data?.filter(
      (city) => !selectedIds.includes(city.id)
    );
    setCities(!!unselectedCities ? unselectedCities : []);
  }, [cityOpts?.data]);

  // get the state ID and lga ID from already selected cities
  useEffect(() => {
    if (!!selectedInfo?.stateId) {
      setFieldValue("stateId", selectedInfo?.stateId);
      setFieldValue("lgaId", selectedInfo?.lgaId);
    }
  }, [selectedInfo?.stateId, selectedInfo?.lgaId]);

  // get the state ID and lga ID from newly added cities
  useEffect(() => {
    if (!!newlyAddedInfo?.stateName && !!states?.data && !values.stateId) {
      const newStateId = states?.data?.filter(
        (state) => state.name === newlyAddedInfo.stateName
      )?.[0]?.id;

      setFieldValue("stateId", newStateId);
    }
  }, [newlyAddedInfo?.stateName, states?.data]);

  useEffect(() => {
    if (!!lgas?.data?.length && !!lgas?.data && !values.lgaId) {
      const newLgaId = lgas?.data?.filter(
        (lga) => lga.name === newlyAddedInfo?.lgaName
      )?.[0]?.id;

      console.log({ newLgaId });
      setFieldValue("lgaId", newLgaId);
    }
  }, [newlyAddedInfo?.lgaName, lgas?.data]);

  // check if the city already exists in another territory
  const { data: cityRecordData } = useCheckCityExistence(values.city, {
    enabled: !!values.city,
  });

  // get selected cities
  useEffect(() => {
    // filter the cities to have ones already selected
    if (cities?.length > 0) {
      const selectedCity = cities.filter((c) => c.id === parseInt(values.city));
      if (selectedCity.length > 0) setSelected(...selectedCity);
      else setSelected({});
    }
  }, [values.city]);

  const endDateData = cityRecordData?.data?.split(" ");
  const endDate = endDateData?.[0] || "";

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Add City" closeModal={closeModal} />

      <Fields>
        <FormGroup columns="2" mb="1rem">
          <GlobalSelect
            labelText="State"
            options={!!states?.data ? stringComparator(states?.data) : []}
            selectName={"stateId"}
            selectValue={values.stateId}
            handleBlur={handleBlur}
            handleChange={handleChange}
            defaultOption="Select State"
            disabled={!!selectedInfo?.stateId || !!newlyAddedInfo?.stateName}
          />

          <GlobalSelect
            labelText="LGA"
            options={!!lgas?.data ? stringComparator(lgas?.data) : []}
            selectName={"lgaId"}
            selectValue={values.lgaId}
            handleBlur={handleBlur}
            handleChange={handleChange}
            defaultOption="Select LGA"
            disabled={!!selectedInfo?.lgaId || !!newlyAddedInfo?.lgaName}
          />
        </FormGroup>

        <GlobalBallBeat loading={loadingCities} />

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={1}
        >
          <p className="text-black">
            If the city you are looking for is not available.
          </p>
          <GlobalAltBtn
            onClick={openSaveCity}
            width="max-content"
            py="0.7rem"
            px="1.2rem"
            border="none"
            bgClr="#4c4c4c"
            color="#fff"
          >
            Save New City
          </GlobalAltBtn>
        </Stack>
      </Fields>

      <form onSubmit={handleSubmit}>
        {cities?.length > 0 && (
          <FormGroup className="mb-4" columns="3">
            {cities?.map((c) => {
              return (
                <GlobalCheckbox
                  fs="15px"
                  gap="16px"
                  mb={"0"}
                  key={c.id}
                  inputId={`city-${c.id}`}
                  inputType={"radio"}
                  bRad="50%"
                  inputName="city"
                  inputValue={c.id}
                  handleChange={handleChange}
                  checked={values.city === String(c.id)}
                  labelText={`${c.name}`}
                />
              );
            })}
          </FormGroup>
        )}

        {!cities?.length && !!values.lgaId && !loadingCities && (
          <p className="text-danger text-center mb-4">
            No city was found with this query.
          </p>
        )}

        {errors.city && touched.city && (
          <FieldError className="mb-4">{errors.city}</FieldError>
        )}

        <>
          {!!cityRecordData?.message && (
            <p
              className={`${
                cityRecordData?.data ? "bg-warning" : "bg-success"
              } text-white rounded p-2 mb-4 fs-6 text-center`}
            >
              {cityRecordData?.message}
            </p>
          )}

          {!cityRecordData?.data && (
            <FormGroup className="mb-4" columns="3">
              <GlobalInput
                inputName="start"
                inputType="date"
                inputValue={values.start}
                labelText={"Start Date"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.start && touched.start}
                errorMessage={errors.start}
                min={endDate || today}
                required
              />
              <GlobalInput
                inputName="end"
                inputType="date"
                inputValue={values.end}
                labelText={"End Date"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.end && touched.end}
                errorMessage={errors.end}
                min={values.start}
              />
              <GlobalInput
                inputName="endtime"
                inputType="time"
                inputValue={values.endtime}
                labelText={"End Time"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.endtime && touched.endtime}
                errorMessage={errors.endtime}
                // required
              />
            </FormGroup>
          )}
        </>

        {!endDateData?.data && (
          <GlobalBtn mx="auto" type="submit" disabled={!selected?.id}>
            Add
          </GlobalBtn>
        )}
      </form>
    </GlobalModal>
  );
};

export default AddCity;
