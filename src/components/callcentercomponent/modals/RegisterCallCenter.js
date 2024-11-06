import { useEffect, useRef, useState } from "react";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import GlobalModal from "../../globalcomponents/GlobalModal";
import ModalHeader from "../../layouts/modal/ModalHeader";
import LogoutUser from "../../globalcomponents/globalformgroups/LogoutUser";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useFormik } from "formik";
import usePhoneBreakdown from "../../../hooks/usePhoneBreakdown";
import {
  useCreateAddressOnRequest,
  useGetUserProfile,
} from "../../../hooks/useQueries/useIdentity";
import PersonalInfoFormGroup from "../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import AcademicInfoFormGroup from "../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import {
  useCallCenterApplication,
  useGetLanguage,
  useGetQualifications,
} from "../../../hooks/useQueries/useOnboarding";
import CallCenterLanguage from "../../globalcomponents/globalformgroups/CallCenterLanguage";
import DocumentsFormGroup from "../../globalcomponents/globalformgroups/DocumentsFormGroup";
import VideoFormGroup from "../../globalcomponents/globalformgroups/VideoUploadFormGroup";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { registerCallCenterSchema } from "../../../Validations/callCenterVallidation";
import useLoginDetails from "../../../hooks/useLoginDetails";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { format } from "date-fns";
import {
  useGetVideoTopics,
  useViewTermsAndConditions,
} from "../../../hooks/useQueries/useAdmin";
import { Link } from "react-router-dom";
import CallCenterTerms from "./CallCenterTerms";

const RegisterCallCenter = ({
  isOpen,
  closeModal,
  openSuccessModal,
  isScriptLoadSucceed,
  openMemberAlready,
}) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [vidUploadResponse, setVidUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [internalVidUploadErrors, setInternalVidUploadErrors] = useState("");
  const [cityId, setCityId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef(null);
  const { isExpired } = useLoginDetails();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  // fetching data
  const { data: qualifications } = useGetQualifications({
    refetchOnWindowFocus: false,
  });
  const { data: languageData } = useGetLanguage();
  const { data: userData } = useGetUserProfile({
    enabled: !isExpired,
  });

  const { data: topicData } = useGetVideoTopics("CCO");

  const topicOptions = topicData?.data?.map((topic) => {
    return {
      name: topic.topic,
      id: topic.id,
    };
  });
  const user = userData?.user;

  const { phoneNo, phoneCountry } = usePhoneBreakdown(user?.phoneNumber);

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  // initialize the fields with the logged in user details
  useEffect(() => {
    if (user?.firstName) {
      setFieldValue("firstName", user.firstName);
      setFieldValue("lastName", user.lastName);
      setFieldValue("email", user.email);
      setFieldValue("gender", user.genderId);
      setFieldValue("dob", format(new Date(user.dateOfBirth), "dd-MM-yyyy"));
    }
  }, [user?.firstName]);

  useEffect(() => {
    if (phoneNo) {
      setFieldValue("phoneNo", phoneNo);
      setSelectedCountry(phoneCountry);
    }
  }, [phoneNo]);

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

  const handleLogout = () => {
    closeModal();
    openMemberAlready();
  };

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
    openSuccessModal();
  };
  const onCreateSuccess = () => {
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
      cityId: Number(cityId),
      residentialAddress: inputRef.current.value,
      academicQualificationId: Number(values.education),
      courseOfStudy: values.course,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      emailAddress: values.email,
      applicationMultimedias: multimedia,
      languages: langs,
      referral: values.referral,
    };
    callCenterApply(payload);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: callCenterApply, isLoading: isApplying } =
    useCallCenterApplication(onSuccess, onFailure);
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onFailure
  );

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
      referral: "",
    },
    validationSchema: registerCallCenterSchema,
    onSubmit,
  });

  // console.log(selectedLang);

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
      <ModalHeader
        closeModal={closeModal}
        title="Call Center Operator Application Form"
        subHeading="Kindly complete the form below to apply for the call center operator role at
          FixMaster"
      />

      {user?.firstName && <LogoutUser action={handleLogout} />}
      <GlobalBallBeat loading={isApplying} />
      <form onSubmit={handleSubmit}>
        <PersonalInfoFormGroup user={user} formikHandlers={formikHandlers} />

        <ContactInfoFormGroup
          user={user}
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
          topicOption={topicOptions}
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
            required
          />

          <GlobalCheckbox
            labelText={
              <>
                I agree to the{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTermsModal(true);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--clr-primary)",
                  }}
                >
                  Terms & Conditions
                </button>
              </>
            }
            mb="0"
            inputName={"termsOfService"}
            inputValue={values.termsOfService}
            handleChange={handleChange}
            required
          />
        </Fields>
        <GlobalBtn width="100%" type="submit" disabled={!values.terms}>
          {isApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isApplying} />

      {openTermsModal && (
        <CallCenterTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`CALL CENTER OPERATOR TERMS AND CONDITIONS`}
        />
      )}
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  RegisterCallCenter
);
