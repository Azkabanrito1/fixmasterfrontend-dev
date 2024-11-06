import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import { useFormik } from "formik";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";
import {
  useCallCenterApplication,
  useCreateCcoByAdmin,
  useGetLanguage,
  useGetQualifications,
} from "../../../../hooks/useQueries/useOnboarding";
import useFetch from "../../../../hooks/useFetch";
import { registerCallCenterSchema } from "../../../../Validations/callCenterVallidation";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import PersonalInfoFormGroup from "../../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../../globalcomponents/globalformgroups/AddressInformation";
import DocumentsFormGroup from "../../../globalcomponents/globalformgroups/DocumentsFormGroup";
import AcademicInfoFormGroup from "../../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import CallCenterLanguage from "../../../globalcomponents/globalformgroups/CallCenterLanguage";
import VideoFormGroup from "../../../globalcomponents/globalformgroups/VideoUploadFormGroup";
import { Fields } from "../../../globalcomponents/Utilities";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import { formTopics } from "../../../../redux/cse/actions";
import { useCreateAddressOnRequest } from "../../../../hooks/useQueries/useIdentity";
import { useGetVideoTopics } from "../../../../hooks/useQueries/useAdmin";

const CreateCCO = ({ isOpen, closeModal, isScriptLoadSucceed }) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [vidUploadResponse, setVidUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [internalVidUploadErrors, setInternalVidUploadErrors] = useState("");
  const [cityId, setCityId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef(null);
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  // fetching data
  const { data: qualifications } = useGetQualifications({
    refetchOnWindowFocus: false,
  });
  const { data: languageData } = useGetLanguage();

  const { data: topicData } = useGetVideoTopics("CCO");

  const topicOption = topicData?.data?.map((topic) => {
    return {
      name: topic.topic,
      id: topic.id,
    };
  });

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  useEffect(() => {
    const { state, lga, city, cityIdResult } = addressComponents;

    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setCityId(cityIdResult);
    }
    if (inputRef.current) setFieldValue("address", inputRef.current.value);
  }, [addressComponents, inputRef]);

  const onSubmit = (values) => {
    const payload = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };

    createAddress(payload);
  };

  const onSuccess = () => {
    enqueueSnackbar("Application submitted successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  function onCreateSuccess(createResponse) {
    window.scrollTo(0, 0);
    setInternalErrors("");

    const pdfMedia = uploadResponse.map((response, id) => {
      return {
        id,
        attachmentType: response.contentType,
        content: response.content,
        contentId: response.contentId,
      };
    });

    const videoMedia = vidUploadResponse.map((response, id) => {
      return {
        id,
        attachmentType: response.contentType,
        content: response.content,
        contentId: response.contentId,
      };
    });

    const multimedia = [...pdfMedia, ...videoMedia];

    if (pdfMedia.length < 2) {
      setInternalErrors("Please upload the files");
      return;
    }

    if (videoMedia.length < 1) {
      setInternalVidUploadErrors("Please upload the files");
      return;
    }

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      genderId: Number(values.gender),
      dateOfBirth: values.dob,
      cityId: Number(createResponse.data.cityIdResult),
      residentialAddress: inputRef.current.value,
      academicQualificationId: Number(values.education),
      courseOfStudy: values.course,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      emailAddress: values.email,
      applicationMultimedias: multimedia,
      languages: langs,
    };
    callCenterApply(payload);
  }
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onFailure
  );

  const { mutate: callCenterApply, isLoading: isApplying } =
    useCreateCcoByAdmin(onSuccess, onFailure);

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      languages: [],
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      gender: "",
      dob: "",
      country: "",
      state: "",
      lga: "",
      city: "",
      address: "",
      education: "",
      course: "",
      cv: null,
      coverLetter: null,
      terms: false,
      video: null,
      topics: "",
      languagePercent: {},
    },
    validationSchema: registerCallCenterSchema,
    onSubmit,
  });

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
  };
  const inputNames = {
    addressName: "address",
    stateName: "state",
    lgaName: "lga",
    cityName: "city",
    locationName: "location",
    postalCodeName: "postalCode",
  };

  const selectedLang = languageData?.data?.filter((lang) => {
    return values.languages.includes(lang.name);
  });

  const langs = selectedLang?.map((language) => {
    return {
      id: language.id,
      name: language.name,
      languagePercentage: values.languagePercent[language.name],
    };
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading="Create Call Center Operator"
      />

      <GlobalBallBeat loading={isApplying} />

      <form onSubmit={handleSubmit}>
        <PersonalInfoFormGroup formikHandlers={formikHandlers} />

        <ContactInfoFormGroup
          formikHandlers={formikHandlers}
          country={selectedCountry}
          setCountry={setSelectedCountry}
          heading="Candidate’s Contact Information"
        />

        <AddressInfoFormGroup
          formikHandlers={formikHandlers}
          inputRef={inputRef}
          inputNames={inputNames}
          withLocation={false}
          withPostalCode={false}
        />

        <DocumentsFormGroup
          formikHandlers={formikHandlers}
          internalErrors={internalErrors}
          removeFile={removeFile}
          setInternalErrors={setInternalErrors}
          setUploadResponse={setUploadResponse}
          uploadResponse={uploadResponse}
        />

        <AcademicInfoFormGroup
          formikHandlers={formikHandlers}
          qualifications={qualifications}
        />

        <CallCenterLanguage
          data={languageData?.data}
          formikHandlers={formikHandlers}
        />

        <VideoFormGroup
          formikHandlers={formikHandlers}
          topicOption={topicOption}
          removeFile={removeFile}
          uploadResponse={vidUploadResponse}
          setUploadResponse={setVidUploadResponse}
          internalErrors={internalVidUploadErrors}
          setInternalErrors={setInternalVidUploadErrors}
        />

        <Fields>
          <GlobalCheckbox
            inputName="terms"
            inputValue={values.terms}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.terms && errors.terms}
            errorMessage={errors.terms}
            labelText="I agree that all documents and information provided are genuine."
          />
        </Fields>
        <GlobalBtn width="100%" type="submit" disabled={!values.terms}>
          {isApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(CreateCCO);
