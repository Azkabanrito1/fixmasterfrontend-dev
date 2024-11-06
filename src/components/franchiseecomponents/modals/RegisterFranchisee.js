import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { registerFranchiseeSchema } from "../../../Validations/franchiseeRegValidations";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import { Fields } from "../../globalcomponents/Utilities";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import { useGetTerritoriesByGeolocation } from "../../../hooks/useQueries/useAdmin";
import {
  useFranchiseeApplication,
  useFranchiseeApplicationAuth,
  useGetQualifications,
} from "../../../hooks/useQueries/useOnboarding";
import {
  useCreateAddressOnRequest,
  useGetLgaByStateName,
  useGetUserProfile,
} from "../../../hooks/useQueries/useIdentity";
import ModalHeader from "../../layouts/modal/ModalHeader";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import LogoutUser from "../../globalcomponents/globalformgroups/LogoutUser";
import FranchiseeXPFormGroup from "../../globalcomponents/globalformgroups/FranchiseeExperienceFormGroup";
import AcademicInfoFormGroup from "../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import DocumentsFormGroup from "../../globalcomponents/globalformgroups/DocumentsFormGroup";
import PersonalInfoFormGroup from "../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import useLoginDetails from "../../../hooks/useLoginDetails";
import usePhoneBreakdown from "../../../hooks/usePhoneBreakdown";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import styled from "styled-components";
import { FormGroup } from "react-bootstrap";
import GlobalInput from "../../globalcomponents/GlobalInput";
import FranchiseeTerms from "./FranchiseeTerms";
import { format } from "date-fns";

const RegisterFranchisee = ({
  isOpen,
  closeModal,
  openSuccessModal,
  isScriptLoadSucceed,
  openMemberAlready,
}) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [lgaId, setLgaId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const inputRef = useRef(null);
  const { isExpired } = useLoginDetails();
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  // -------------------------------mutations--------------------------------
  const onApplicaticationSuccess = () => {
    enqueueSnackbar("Application submitted successfully", {
      variant: "success",
    });
    openSuccessModal();
  };
  const onCreateSuccess = (response) => {
    window.scrollTo(0, 0);
    setInternalErrors("");

    const multimedia = uploadResponse.map((response, index) => {
      return {
        id: index,
        attachmentType: response.contentType,
        content: response.content,
        contentId: response.contentId,
      };
    });

    if (multimedia.length < 2) {
      setInternalErrors("Please upload the files");
      return;
    }

    const payload = {
      countryId: 0,
      stateId: 0,
      lgaId: 0,
      cityId: response.data.cityIdResult,
      firstName: values.firstName,
      lastName: values.lastName,
      emailAddress: values.email,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      genderId: parseInt(values.gender),
      dateOfBirth: values.dob,
      residentialAddress: values.address,
      territoryId: parseInt(values.territory),
      academicQualificationId: parseInt(values.education),
      courseOfStudy: values.course,
      runningBusiness: Boolean(values.runBusiness),
      provableStaff: values.management,
      marketingSkill: Boolean(values.marketing),
      haveFunds: Boolean(Number(values.haveFunds)),
      howMuch: values.howMuch,
      applicationMultimedias: multimedia,
      referralCode: values.referral,
      landmark: values.locationName,
    };
    if (!isExpired) {
      authFranchiseeApply(payload);
    } else {
      franchiseeApply(payload);
    }
  };
  const onApplicaticationFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: authFranchiseeApply, isLoading: authIsApplying } =
    useFranchiseeApplicationAuth(
      onApplicaticationSuccess,
      onApplicaticationFailure
    );
  const { mutate: franchiseeApply, isLoading: isApplying } =
    useFranchiseeApplication(
      onApplicaticationSuccess,
      onApplicaticationFailure
    );
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onApplicaticationFailure
  );

  // --------------------------fetching data--------------------------
  const { data: qualificationsOptions } = useGetQualifications({
    refetchOnWindowFocus: false,
  });
  const { data: territoryAvailable } = useGetTerritoriesByGeolocation({
    lgaId,
    longitude: addressComponents.longitude,
    latituded: addressComponents.latitude,
    collaborator: 2,
  });
  const { data: lgaData } = useGetLgaByStateName(addressComponents.state, {
    enabled: !!addressComponents.state,
  });
  const { data: userData } = useGetUserProfile({
    enabled: !isExpired,
  });
  const user = userData?.user;
  const { phoneNo, phoneCountry } = usePhoneBreakdown(user?.phoneNumber);

  // initialize the fields with the logged in user details
  useEffect(() => {
    if (user?.firstName) {
      setFieldValue("firstName", user.firstName);
      setFieldValue("lastName", user.lastName);
      setFieldValue("email", user.email);
      setFieldValue("gender", user.genderId);
      setFieldValue("dob", format(user.dateOfBirth, "yyyy-MM-dd"));
    }
  }, [user?.firstName]);

  useEffect(() => {
    if (phoneNo) {
      setFieldValue("phoneNo", phoneNo);
      setSelectedCountry(phoneCountry);
    }
  }, [phoneNo]);

  // fill in the fields for address breakdown on input of address
  useEffect(() => {
    const { state, lga, city } = addressComponents;

    if (state) {
      const lgaId = lgaData?.data?.filter(
        (lgaItem) => lgaItem.name === lga
      )?.[0]?.id;

      setLgaId(lgaId);
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
    }
    if (inputRef.current) setFieldValue("address", inputRef.current.value);
  }, [addressComponents, inputRef]);

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  const handleLogout = () => {
    closeModal();
    openMemberAlready();
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
      state: "",
      lga: "",
      city: "",
      address: "",
      territory: "",
      education: "",
      course: "",
      runBusiness: "",
      management: "",
      marketing: "",
      haveFunds: "",
      howMuch: "",
      referral: "",
      locationName: "",
      cv: null,
      coverLetter: null,
      terms: false,
    },
    validationSchema: registerFranchiseeSchema,
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
        title="Franchisee Application Form"
        subHeading="Kindly complete the form below to apply for the franchisee role at
          FixMaster"
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
          inputNames={inputNames}
          inputRef={inputRef}
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

        <FranchiseeXPFormGroup formikHandlers={formikHandlers} />

        <DocumentsFormGroup
          formikHandlers={formikHandlers}
          internalErrors={internalErrors}
          removeFile={removeFile}
          setInternalErrors={setInternalErrors}
          setUploadResponse={setUploadResponse}
          uploadResponse={uploadResponse}
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

        <GlobalBtn
          width="100%"
          type="submit"
          disabled={
            !isVacantTerritory || !values.terms || isApplying || authIsApplying
          }
        >
          {isApplying || authIsApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isApplying || authIsApplying} />

      {openTermsModal && (
        <FranchiseeTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`FRANCHISEE TERMS AND CONDITIONS`}
        />
      )}
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  RegisterFranchisee
);

const TerritoryMsg = styled.div`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: ${({ hasVacancy }) =>
    hasVacancy ? "rgba(25,135,84, 0.15)" : "rgba(220,53,69, 0.15)"};
`;
