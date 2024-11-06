import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import {
  useGetLanguage,
  useGetSocialMediaPlatforms,
  useTechnicianApplication,
  useGetQualifications,
} from "../../../hooks/useQueries/useOnboarding";
import {
  useCreateAddressOnRequest,
  useGetUserProfile,
} from "../../../hooks/useQueries/useIdentity";
import ModalHeader from "../../layouts/modal/ModalHeader";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import PersonalInfoFormGroup from "../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AcademicInfoFormGroup from "../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import DocumentsFormGroup from "../../globalcomponents/globalformgroups/DocumentsFormGroup";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import LogoutUser from "../../globalcomponents/globalformgroups/LogoutUser";
import LanguageInfoFormGroup from "../../globalcomponents/globalformgroups/LanguageInfoFormGroup";
import TechnicianExperienceFormGroup from "../../globalcomponents/globalformgroups/TechnicianExperienceFormGroup";
import TechExposureFormGroup from "../../globalcomponents/globalformgroups/TechExposureFormGroup";
import SubCategory from "../../globalcomponents/modals/SubCategoriesModal";
import SpecializationsFormGroup from "../../globalcomponents/globalformgroups/SpecializationsFormGroup";
import usePhoneBreakdown from "../../../hooks/usePhoneBreakdown";
import { registerTechnicianSchema } from "../../../Validations/addTechnicianValidation";
import useLoginDetails from "../../../hooks/useLoginDetails";
import moment from "moment";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import { FormGroup } from "react-bootstrap";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { Fields } from "../../globalcomponents/Utilities";
import {
  useGetRootCategories,
  useGetRootSubcatById,
  useViewTermsAndConditions,
} from "../../../hooks/useQueries/useAdmin";
import { Link } from "react-router-dom";
import TechnicianTerms from "./TechnicianTerms";

const RegisterTechnician = ({
  isOpen,
  closeModal,
  openSuccessModal,
  isScriptLoadSucceed,
  openMemberAlready,
}) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [showMainSubCategories, setShowMainSubCategories] = useState(false);
  const [showOtherSubCategories, setShowOtherSubCategories] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [cityId, setCityId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const inputRef = useRef();
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
  const onApplicaticationFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const onCreateSuccess = (createResponse) => {
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

    const selectedLanguages = languages.map((lang) => ({
      id: lang.id,
      name: lang.name,
    }));

    const selectedMediaPlatforms = socialMediaPlatforms.map((platform) => ({
      platformId: platform.id,
      platformName: platform.name,
    }));

    const preferredLang = selectedLanguages.filter(
      (lang) => lang.name === values.preferredLanguage
    );
    const langId = preferredLang[0].id;

    const primarySubCategories = values.mainSubCategories.map((cat) => ({
      categoryId: +values.mainCategory,
      subCategoryId: cat.id,
      subCategoryName: cat.name,
    }));

    const secondarySubCategories = values.otherSubCategories.map((cat) => ({
      categoryId: +values.otherCategory,
      subCategoryId: cat.id,
      subCategoryName: cat.name,
    }));

    const payload = {
      countryId: 0,
      stateId: 0,
      lgaId: 0,

      firstName: values.firstName,
      lastName: values.lastName,
      genderId: +values.gender,
      dateOfBirth: values.dob,
      cityId: createResponse?.data?.cityIdResult,
      residentialAddress: values.address,
      location: values.location,
      languages: selectedLanguages,
      emailAddress: values.email,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      academicQualificationId: +values.education,
      courseOfStudy: values.course,
      applicationMultimedias: multimedia,
      preferredLanguageId: langId,
      postalCode: values.postalCode,
      yearsOfExpertise: values.yearsOfExperience,
      secondaryYearsOfExpertise: values.secondaryYearsOfExpertise,
      attendTechnicalTraining: values.attendTraining,
      trainedOthers: !!+values.trainedOthers,
      ownSmartPhone: !!+values.ownPhone,
      socialMedia: !!+values.socialMedia,
      openForProfessionalTraining: !!+values.openTraining,
      socialMediaPlatforms: selectedMediaPlatforms,
      preferredCategoryId: +values.mainCategory,
      subCategories: [...primarySubCategories, ...secondarySubCategories],
      longitude,
      latitude,
      referralCode: values.referral,
    };

    technicianApply(payload);
  };
  const { mutate: technicianApply, isLoading: isApplying } =
    useTechnicianApplication(
      onApplicaticationSuccess,
      onApplicaticationFailure
    );
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onApplicaticationFailure
  );

  // --------------------------fetching data--------------------------
  const { data: languageData } = useGetLanguage({
    refetchOnWindowFocus: false,
  });
  const { data: categoriesData } = useGetRootCategories({
    refetchOnWindowFocus: false,
  });
  const { data: socialMediaData } = useGetSocialMediaPlatforms({
    refetchOnWindowFocus: false,
  });
  const { data: qualifications } = useGetQualifications({
    refetchOnWindowFocus: false,
  });
  const { data: userData } = useGetUserProfile({
    enabled: !isExpired,
  });
  const user = userData?.user;

  const { phoneNo, phoneCountry } = usePhoneBreakdown(user?.phoneNumber);

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

  // -------------------------------useFormik-----------------------------
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
      postalCode: "",
      education: "",
      course: "",
      preferredLanguage: "",
      mainCategory: "",
      otherCategory: "",
      languages: [],
      mainSubCategories: [],
      otherSubCategories: [],
      mediaChannels: [],
      yearsOfExperience: "",
      secondaryYearsOfExpertise: "",
      openTraining: "",
      attendTraining: "",
      trainedOthers: "",
      socialMedia: "",
      ownPhone: "",
      referral: "",
      cv: null,
      coverLetter: null,
      terms: false,
    },
    validationSchema: registerTechnicianSchema,
    onSubmit,
  });

  // -------------------------------dependent queries-------------------------------
  const { data: mainSubCategoryData, isLoading: isLoadingMainSubCats } =
    useGetRootSubcatById(values.mainCategory, {
      enabled: !!values.mainCategory,
    });
  const { data: otherSubCategoryData, isLoading: isLoadingOtherSubCats } =
    useGetRootSubcatById(values.otherCategory, {
      enabled: !!values.otherCategory,
    });

  // initialize the fields with the logged in user details
  useEffect(() => {
    if (user?.firstName) {
      setFieldValue("firstName", user.firstName);
      setFieldValue("lastName", user.lastName);
      setFieldValue("email", user.email);
      setFieldValue("gender", user.genderId);
      setFieldValue("dob", moment(user.dateOfBirth).format("YYYY-MM-DD"));
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
    const { state, lga, city, cityIdResult, longitude, latitude } =
      addressComponents;

    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setLatitude(latitude);
      setLongitude(longitude);
      setCityId(cityIdResult);
    }
    if (inputRef.current) setFieldValue("address", inputRef.current.value);
  }, [addressComponents, inputRef]);

  useEffect(() => {
    if (!!values.mainCategory) {
      setFieldValue("mainSubCategories", []);
    }
  }, [values.mainCategory]);

  useEffect(() => {
    if (!!values.otherCategory) {
      setFieldValue("otherSubCategories", []);
    }
  }, [values.otherCategory]);

  const handleLogout = () => {
    closeModal();
    openMemberAlready();
  };
  const openMainSubModal = () => setShowMainSubCategories(true);
  const closeMainSubModal = () => setShowMainSubCategories(false);
  const openOtherSubModal = () => setShowOtherSubCategories(true);
  const closeOtherSubCategories = () => setShowOtherSubCategories(false);

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

  const languages = languageData?.data?.filter((lang) =>
    values.languages.includes(lang.name)
  );

  const socialMediaPlatforms = socialMediaData?.data?.filter((platform) =>
    values.mediaChannels.includes(platform.name)
  );

  const selectedSubCatNames = values.mainSubCategories?.map((cat) => cat.name);

  const selectedOtherSubCatNames = values.otherSubCategories?.map(
    (cat) => cat.name
  );

 
  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <ModalHeader
        closeModal={closeModal}
        title="Technician Application Form"
        subHeading="Kindly complete the form below to apply for the Technician role at
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
          withLocation={true}
          withPostalCode={true}
        />

        <AcademicInfoFormGroup
          formikHandlers={formikHandlers}
          qualifications={qualifications}
        />

        <LanguageInfoFormGroup
          data={languageData?.data}
          formikHandlers={formikHandlers}
          selectedLanguages={languages}
          withPreferred={true}
        />

        <SpecializationsFormGroup
          formikHandlers={formikHandlers}
          categories={categoriesData?.data}
          openMainSubCategory={openMainSubModal}
          openOtherSubCategory={openOtherSubModal}
          selectedSubCatNames={selectedSubCatNames}
          selectedOtherSubCatNames={selectedOtherSubCatNames}
        />

        <TechnicianExperienceFormGroup formikHandlers={formikHandlers} />

        <TechExposureFormGroup
          formikHandlers={formikHandlers}
          initData={socialMediaData?.data}
        />

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
          disabled={!values.terms || isApplying}
        >
          {isApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isApplying} />

      {showMainSubCategories && !!values.mainCategory && (
        <SubCategory
          handleFormik={formikHandlers}
          isOpen={showMainSubCategories && !!values.mainCategory}
          addToCategories={(subCats) =>
            setFieldValue("mainSubCategories", subCats)
          }
          isLoading={isLoadingMainSubCats}
          closeModal={closeMainSubModal}
          subCategoriesData={mainSubCategoryData}
          selectedCategories={values.mainSubCategories}
        />
      )}

      {showOtherSubCategories && !!values.otherCategory && (
        <SubCategory
          addToCategories={(subCats) =>
            setFieldValue("otherSubCategories", subCats)
          }
          isLoading={isLoadingOtherSubCats}
          isOpen={showOtherSubCategories && !!values.otherCategory}
          closeModal={closeOtherSubCategories}
          subCategoriesData={otherSubCategoryData}
          selectedCategories={values.otherSubCategories}
        />
      )}
      {openTermsModal && (
        <TechnicianTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`TECHNICIAN TERMS AND CONDITIONS`}
        />
      )}
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  RegisterTechnician
);
