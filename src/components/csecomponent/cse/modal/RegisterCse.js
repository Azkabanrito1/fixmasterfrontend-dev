import { useState, useEffect, useRef } from "react";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import { useSnackbar } from "notistack";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { registerCseSchema } from "../../../../Validations/cseRegValidation";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";
import {
  useCSEApplication,
  useCSEApplicationAuth,
  useGetQualifications,
} from "../../../../hooks/useQueries/useOnboarding";
import {
  useCreateAddressOnRequest,
  useGetLgaByStateName,
  useGetUserProfile,
} from "../../../../hooks/useQueries/useIdentity";
import ModalHeader from "../../../layouts/modal/ModalHeader";
import PersonalInfoFormGroup from "../../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../../globalcomponents/globalformgroups/AddressInformation";
import AcademicInfoFormGroup from "../../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import DocumentsFormGroup from "../../../globalcomponents/globalformgroups/DocumentsFormGroup";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import LogoutUser from "../../../globalcomponents/globalformgroups/LogoutUser";
import VideoFormGroup from "../../../globalcomponents/globalformgroups/VideoUploadFormGroup";
import useLoginDetails from "../../../../hooks/useLoginDetails";
import usePhoneBreakdown from "../../../../hooks/usePhoneBreakdown";
import {
  useGetTerritoriesByGeolocation,
  useGetVideoTopics,
} from "../../../../hooks/useQueries/useAdmin";
import format from "date-fns/format";
import CseTerms from "./CseTerms";
import styled from "styled-components";

const RegisterCse = ({
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
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [lgaId, setLgaId] = useState("");

  const inputRef = useRef(null);
  const { isExpired } = useLoginDetails();
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);
  const [openTermsModal, setOpenTermsModal] = useState(false);

  // fetch requests
  const { data: qualificationsOptions } = useGetQualifications();
  const { data: lgaData } = useGetLgaByStateName(addressComponents.state, {
    enabled: !!addressComponents.state,
  });

  const { data: topicData } = useGetVideoTopics("CSE");

  const topicOptions = topicData?.data?.map((topic) => {
    return {
      name: topic.topic,
      id: topic.id,
    };
  });

  const { data: territoryAvailable } = useGetTerritoriesByGeolocation({
    lgaId,
    longitude: addressComponents.longitude,
    latituded: addressComponents.latitude,
    collaborator: 1,
  });

  const { data: userData } = useGetUserProfile({
    enabled: !isExpired,
  });
  const user = userData?.user;

  const { phoneNo, phoneCountry } = usePhoneBreakdown(user?.phoneNumber);

  useEffect(() => {
    if (user?.firstName) {
      setFieldValue("firstName", user.firstName);
      setFieldValue("lastName", user.lastName);
      setFieldValue("email", user.email);
      setFieldValue("gender", user.genderId);
      setFieldValue("dob", format(new Date(user.dateOfBirth), "yyyy-MM-dd"));
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

    if (!!state) {
      const lgaId = lgaData?.data?.filter(
        (lgaItem) => lgaItem.name === lga
      )?.[0]?.id;

      setLgaId(lgaId);
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setFieldValue("cityId", cityIdResult);
      setFieldValue("address", inputRef?.current?.value);
    }
  }, [addressComponents, inputRef]);

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

  const onCreateSuccess = (response) => {
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
      countryId: Number(values.country),
      stateId: 0,
      lgaId: 0,
      cityId: response.data.cityIdResult,
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      genderId: Number(values.gender),
      dateOfBirth: values.dob,
      residentialAddress: values.address,
      academicQualificationId: Number(values.education),
      courseOfStudy: values.course,
      selectTopicId: Number(values.topics),
      applicationMultimedias: multimedia,
      referalCode: values.referral,
      landmark: values.locationName,
      longitude: addressComponents.longitude,
      latitude: addressComponents.latitude,
    };
    if (!isExpired) {
      registerCseAuth(payload);
    } else {
      registerCse(payload);
    }
  };
  const onRegSuccess = () => {
    enqueueSnackbar("Application submitted successfully", {
      variant: "success",
    });
    openSuccessModal();
  };
  const onRegFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: registerCse, isLoading: isApplying } = useCSEApplication(
    onRegSuccess,
    onRegFailure
  );
  const { mutate: registerCseAuth, isLoading: authIsApplying } =
    useCSEApplicationAuth(onRegSuccess, onRegFailure);
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onRegFailure
  );

  const handleLogout = async () => {
    closeModal();
    openMemberAlready();
  };

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
      locationName: "",
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
    locationName: "locationName",
  };

  const isVacantTerritory = territoryAvailable?.data.status === "004";

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <ModalHeader
        closeModal={closeModal}
        title="CSE Application Form"
        subHeading="Kindly complete the form below to apply for the CSE role at FixMaster"
      />

      {user?.firstName && <LogoutUser action={handleLogout} />}

      {(authIsApplying || isApplying) && (
        <GlobalBallBeat loading={authIsApplying || isApplying} />
      )}

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
          withLocation={true}
        />

        {!!territoryAvailable && (
          <TerritoryMsg hasVacancy={isVacantTerritory}>
            <p
              className={`fs-6 text-bold text-center ${
                isVacantTerritory ? "text-success" : "text-danger"
              }`}
            >
              {territoryAvailable?.data.message}
            </p>
          </TerritoryMsg>
        )}

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
            handleBlur={handleBlur}
            error={touched.termsOfService && errors.termsOfService}
            errorMessage={errors.termsOfService}
            required
          />
        </Fields>
        <GlobalBtn
          width="100%"
          type="submit"
          disabled={
            !isVacantTerritory || !values.terms || isApplying || authIsApplying
          }
        >
          {authIsApplying || isApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
      {openTermsModal && (
        <CseTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`CSE TERMS AND CONDITIONS`}
        />
      )}
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  RegisterCse
);

const TerritoryMsg = styled.div`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: ${({ hasVacancy }) =>
    hasVacancy ? "rgba(25,135,84, 0.15)" : "rgba(220,53,69, 0.15)"};
`;
