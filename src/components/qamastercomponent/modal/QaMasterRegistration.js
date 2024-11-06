import moment from "moment";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useState, useRef, useEffect } from "react";
import {
  useGetUserProfile,
  useGetLanguage,
  useGetCategories,
  useGetSubCategories,
  useQaMasterApplication,
  useGetQualifications,
} from "../../../hooks/useQueries/useOnboarding";
import scriptLoader from "react-async-script-loader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import ModalHeader from "../../layouts/modal/ModalHeader";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import useLoginDetails from "../../../hooks/useLoginDetails";
import GlobalModal from "../../globalcomponents/GlobalModal";
import useGooglePlaces from "../../../hooks/useGooglePlaces";
import usePhoneBreakdown from "../../../hooks/usePhoneBreakdown";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import SubCategory from "../../globalcomponents/modals/SubCategoriesModal";
import LogoutUser from "../../globalcomponents/globalformgroups/LogoutUser";
import { registerQamasterSchema } from "../../../Validations/qaMasterValidation";
import DocumentsFormGroup from "../../globalcomponents/globalformgroups/DocumentsFormGroup";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import PersonalInfoFormGroup from "../../globalcomponents/globalformgroups/PersonalInformation";
import AcademicInfoFormGroup from "../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import LanguageInfoFormGroup from "../../globalcomponents/globalformgroups/LanguageInfoFormGroup";
import ContactInfoFormGroup from "../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import QAMasterExperienceFormGroup from "../../globalcomponents/globalformgroups/QAMasterExperienceFormGroup";
import SpecializationsFormGroup from "../../globalcomponents/globalformgroups/SpecializationsFormGroup";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useCreateAddressOnRequest } from "../../../hooks/useQueries/useIdentity";
import {
  useGetRootCategories,
  useGetRootSubcatById,
  useGetSubCategoryById,
  useViewTermsAndConditions,
} from "../../../hooks/useQueries/useAdmin";
import { Link } from "react-router-dom";
import QaTerms from "./QaTerms";

const QaMasterRegistration = ({
  isOpen,
  closeModal,
  openSuccessModal,
  isScriptLoadSucceed,
  openMemberAlready,
}) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [cityId, setCityId] = useState("");
  const [showMainSubCategories, setShowMainSubCategories] = useState(false);
  const [showOtherSubCategories, setShowOtherSubCategories] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const inputRef = useRef(null);
  const { isExpired } = useLoginDetails();
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  // --------------------------mutations--------------------------
  const onSuccess = () => {
    enqueueSnackbar("Application submitted successfully", {
      variant: "success",
    });
    openSuccessModal();
  };
  const onFailure = (response) => {
    if (response.errors) {
      enqueueSnackbar(Object.values(response?.errors)?.flat()?.[0], {
        variant: "error",
      });
    } else {
      enqueueSnackbar(response.message, {
        variant: "error",
      });
    }
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

    const languages = selectedLang?.map((lang) => ({
      id: lang.id,
      name: lang.name,
    }));
    const primarySubCategories = values.mainSubCategories.map((cat) => ({
      categoryId: parseInt(values.mainCategory),
      subCategoryId: cat.id,
      subCategoryName: cat.name,
    }));

    const secondarySubCategories = values.otherSubCategories.map((cat) => ({
      categoryId: parseInt(values.otherCategory),
      subCategoryId: cat.id,
      subCategoryName: cat.name,
    }));

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      genderId: +values.gender,
      dateOfBirth: values.dob,
      cityId: createResponse.data.cityIdResult,
      countryId: 0,
      stateId: 0,
      lgaId: 0,
      location: values.location,
      residentialAddress: values.address,
      languages: languages,
      postalCode: values.postalCode,
      applicationMultimedias: multimedia,
      academicQualificationId: +values.education,
      courseOfStudy: values.course,
      emailAddress: values.email,
      yearsOfExperience: values.technicalTraining,
      secondaryYearsofExperience: values.secondaryYearsofExperience,
      experienceSpecialization: Boolean(+values.specialization),
      yearsOfTraining: values.trainingOther,
      subCategories: [...primarySubCategories, ...secondarySubCategories],
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      referalCode: values.referral,
    };
    registerQamster(payload);
  };

  const { mutate: registerQamster, isLoading: isApplying } =
    useQaMasterApplication(onSuccess, onFailure);
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onCreateSuccess,
    onFailure
  );

  // --------------------------fetching data--------------------------
  const { data: qualificationsOptions } = useGetQualifications({
    refetchOnWindowFocus: false,
  });
  const { data: languageData } = useGetLanguage({
    refetchOnWindowFocus: false,
  });
  const { data: categoriesData } = useGetRootCategories({
    refetchOnWindowFocus: false,
  });

  const { data: userData } = useGetUserProfile({
    enabled: !isExpired,
  });
  const user = userData?.user;
  const { phoneNo, phoneCountry } = usePhoneBreakdown(user?.phoneNumber);
  const openMainSubModal = () => setShowMainSubCategories(true);
  const closeMainSubModal = () => setShowMainSubCategories(false);
  const openOtherSubModal = () => setShowOtherSubCategories(true);
  const closeOtherSubCategories = () => setShowOtherSubCategories(false);

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

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  useEffect(() => {
    const { state, lga, city, cityIdResult, longitude, latitude } =
      addressComponents;
    if (!!state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setCityId(cityIdResult);
    }
    if (inputRef.current) setFieldValue("address", inputRef.current.value);
  }, [addressComponents, inputRef]);

  const handleLogout = async () => {
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
    console.log(payload);
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
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      phoneNo: "",
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
      languages: [],
      location: "",
      specialization: "",
      categoryType: "",
      mainCategory: "",
      otherCategory: "",
      otherSubCategory: "",
      mainSubCategories: [],
      otherSubCategories: [],
      category: "",
      trainingOther: "",
      technicalTraining: "",
      secondaryYearsofExperience: "",
      referral: "",
      postalCode: "",
    },
    validationSchema: registerQamasterSchema,
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

  useEffect(() => {
    setFieldValue("subCategory", []);
  }, [values.category]);

  // -------------------------------dependent queries-------------------------------
  const { data: mainSubCategoryData, isLoading: isLoadingMainSubCats } =
    useGetRootSubcatById(values.mainCategory, {
      enabled: !!values.mainCategory,
    });
  const { data: otherSubCategoryData, isLoading: isLoadingOtherSubCats } =
    useGetRootSubcatById(values.otherCategory, {
      enabled: !!values.otherCategory,
    });

  const selectedLang = languageData?.data?.filter((lang) => {
    return values.languages.includes(lang.name);
  });

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
        title="QA Master Application Form"
        subHeading="
          Kindly complete the form below to apply for the QA Master role at
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
          qualifications={qualificationsOptions}
        />
        <SpecializationsFormGroup
          formikHandlers={formikHandlers}
          categories={categoriesData?.data}
          openMainSubCategory={openMainSubModal}
          openOtherSubCategory={openOtherSubModal}
          selectedSubCatNames={selectedSubCatNames}
          selectedOtherSubCatNames={selectedOtherSubCatNames}
        />
        <LanguageInfoFormGroup
          data={languageData?.data}
          formikHandlers={formikHandlers}
          qamaster={true}
        />
        <QAMasterExperienceFormGroup formikHandlers={formikHandlers} />
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
            required={true}
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
        <QaTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`QA TERMS AND CONDITIONS`}
        />
      )}
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  QaMasterRegistration
);
