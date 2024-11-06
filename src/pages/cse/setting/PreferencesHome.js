import NotifyPref from "../../../components/csecomponent/cse/dashboardComponent/setting/preference/NotifyPref";
import WorkingPref from "../../../components/csecomponent/cse/dashboardComponent/setting/preference/WorkingPref";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { useRef } from "react";
import Location from "../../../components/csecomponent/cse/dashboardComponent/setting/preference/Location";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import { useEffect } from "react";
import { useState } from "react";
import TechMaximum from "../../qamaster/settings/TechMaximum";
import {
  useCreateAddressOnRequest,
  useGetContactAndNotificationsPreference,
  useSaveLocationPreference,
  useSaveNotificationsPreference,
} from "../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";
import { locationPreferenceSchema } from "../../../Validations/preferenceLocationValidation";

const PreferenceHome = ({
  employmentType,
  location = false,
  isScriptLoadSucceed,
  earnings = false,
}) => {
  const [cityId, setCityId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const inputRef = useRef(null);
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);
  const { enqueueSnackbar } = useSnackbar();

  //-------------------------data fecthing------------------------
  const { data: preferenceData } = useGetContactAndNotificationsPreference();
  // console.log(preferenceData);

  //------------------------mutate------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };

  const onCreationSuccess = async (response) => {
    const payload = {
      cityId: response?.data?.cityIdResult,
      address: values.address,
      landmark: values.locationName,
      longitude,
      latitude,
    };
    saveLocationPreference(payload);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: saveLocationPreference, isLoading } =
    useSaveLocationPreference(onSuccess, onFailure);
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreationSuccess,
    onFailure
  );

  const { mutate: saveNotification, isLoading: isSavingNotify } =
    useSaveNotificationsPreference(onSuccess, onFailure);

  const onSubmit = async (values) => {
    const payload = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };
    createAddress(payload);
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      status: "",
      clockIn: "",
      clockOut: "",
      workPref: "",
      address: "",
      state: "",
      lga: "",
      city: "",
      locationName: "",
    },
    validationSchema: locationPreferenceSchema,
    onSubmit,
  });

  useEffect(() => {
    const { state, lga, city, cityIdResult, longitude, latitude } =
      addressComponents;
    if (!!state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setCityId(cityIdResult);
      setLatitude(latitude);
      setLongitude(longitude);
    }
    if (inputRef.current) setFieldValue("address", inputRef.current.value);
  }, [addressComponents, inputRef]);

  const formikHandler = {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  };
  const inputName = {
    addressName: "address",
    stateName: "state",
    cityName: "city",
    lgaName: "lga",
    locationName: "locationName",
  };

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Preference</PageHeading>
      </div>

      <WorkingPref
        formikHandler={formikHandler}
        employmentType={employmentType}
      />
      {/* {maximumTechnician && <TechMaximum />} */}
      {location && (
        <Location
          formikHandler={formikHandler}
          inputName={inputName}
          inputRef={inputRef}
          onSubmit={handleSubmit}
          value={values}
          isSaving={isLoading}
        />
      )}
      <NotifyPref
        saveNotification={saveNotification}
        isSaving={isSavingNotify}
        notificationData={preferenceData?.data}
        earning={earnings}
      />
    </>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  PreferenceHome
);
