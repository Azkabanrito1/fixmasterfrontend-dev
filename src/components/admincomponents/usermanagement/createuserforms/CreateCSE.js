import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";
import { registerCseSchema } from "../../../../Validations/cseRegValidation";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import PersonalInfoFormGroup from "../../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../../globalcomponents/globalformgroups/AddressInformation";
import AcademicInfoFormGroup from "../../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import DocumentsFormGroup from "../../../globalcomponents/globalformgroups/DocumentsFormGroup";
import VideoFormGroup from "../../../globalcomponents/globalformgroups/VideoUploadFormGroup";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import {
  useCreateCseByAdmin,
  useGetQualifications,
} from "../../../../hooks/useQueries/useOnboarding";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useCreateAddressOnRequest } from "../../../../hooks/useQueries/useIdentity";
import { useGetVideoTopics } from "../../../../hooks/useQueries/useAdmin";

const CreateCSE = ({ isOpen, closeModal, isScriptLoadSucceed }) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [vidUploadResponse, setVidUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [internalVidUploadErrors, setInternalVidUploadErrors] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  const { data: qualificationsOptions } = useGetQualifications();

  useEffect(() => {
    const { state, lga, city, cityIdResult } = addressComponents;

    setFieldValue("state", state);
    setFieldValue("lga", lga);
    setFieldValue("city", city);
    setFieldValue("cityId", cityIdResult);
    setFieldValue("address", inputRef?.current?.value);
  }, [addressComponents]);

  const { data: topicData } = useGetVideoTopics("CSE");

  const topicOption = topicData?.data?.map((topic) => {
    return {
      name: topic.topic,
      id: topic.id,
    };
  });

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  const onSubmit = async (values) => {
    const payload = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };

    createAddress(payload);
  };

  const onRegSuccess = () => {
    enqueueSnackbar("CSE created successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onRegFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  function onCreateSuccess(response) {
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
      countryId: Number(values.country),
      stateId: 0,
      lgaId: 0,
      cityId: response.data.cityIdResult,
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      phoneNumber: values.phoneNo ? selectedCountry.code + values.phoneNo : "",
      genderId: Number(values.gender),
      dateOfBirth: values.dob,
      residentialAddress: values.address,
      academicQualificationId: Number(values.education),
      courseOfStudy: values.course,
      selectTopicId: Number(values.topics),
      applicationMultimedias: multimedia,
      referalCode: values.referral,
      landmark: "",
      referalCode: "",
      longitude: 0,
      latitude: 0,
    };
    registerCseAuth(payload);
  }
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onRegFailure
  );
  const { mutate: registerCseAuth, isLoading: authIsApplying } =
    useCreateCseByAdmin(onRegSuccess, onRegFailure);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
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
      cityId: "",
      address: "",
      education: "",
      course: "",
      cv: null,
      coverLetter: null,
      terms: false,
      video: null,
      topics: "",
      referral: "",
    },
    validationSchema: registerCseSchema,
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
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader closeModal={closeModal} heading="Create CSE" />

      {authIsApplying && <GlobalBallBeat loading={authIsApplying} />}

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
        />

        <AcademicInfoFormGroup
          formikHandlers={formikHandlers}
          qualifications={qualificationsOptions}
        />

        <DocumentsFormGroup
          formikHandlers={formikHandlers}
          internalErrors={internalErrors}
          removeFile={removeFile}
          setInternalErrors={setInternalErrors}
          setUploadResponse={setUploadResponse}
          uploadResponse={uploadResponse}
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
          <FormGroup columns="1">
            <GlobalInput
              inputType="text"
              inputName="referral"
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputValue={values.referral}
              labelText="Referral Code"
            />
          </FormGroup>
        </Fields>

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
          {authIsApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(CreateCSE);
