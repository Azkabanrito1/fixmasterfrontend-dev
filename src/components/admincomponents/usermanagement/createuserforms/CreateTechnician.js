import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import {
  useGetLanguage,
  useGetSocialMediaPlatforms,
  useGetQualifications,
  useCreateTechnicianByAdmin,
} from "../../../../hooks/useQueries/useOnboarding";
import { registerTechnicianSchema } from "../../../../Validations/addTechnicianValidation";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import PersonalInfoFormGroup from "../../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../../globalcomponents/globalformgroups/AddressInformation";
import AcademicInfoFormGroup from "../../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import LanguageInfoFormGroup from "../../../globalcomponents/globalformgroups/LanguageInfoFormGroup";
import SpecializationsFormGroup from "../../../globalcomponents/globalformgroups/SpecializationsFormGroup";
import TechnicianExperienceFormGroup from "../../../globalcomponents/globalformgroups/TechnicianExperienceFormGroup";
import TechExposureFormGroup from "../../../globalcomponents/globalformgroups/TechExposureFormGroup";
import DocumentsFormGroup from "../../../globalcomponents/globalformgroups/DocumentsFormGroup";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";
import SubCategoriesModal from "../../../globalcomponents/modals/SubCategoriesModal";
import {
  useGetRootCategories,
  useGetRootSubcatById,
} from "../../../../hooks/useQueries/useAdmin";

const CreateTechnician = ({ isOpen, closeModal, isScriptLoadSucceed }) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [showMainSubCategories, setShowMainSubCategories] = useState(false);
  const [showOtherSubCategories, setShowOtherSubCategories] = useState(false);
  const [cityId, setCityId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const inputRef = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  // -------------------------------mutations--------------------------------
  const onApplicaticationSuccess = () => {
    enqueueSnackbar("Application submitted successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onApplicaticationFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: technicianApply, isLoading: isApplying } =
    useCreateTechnicianByAdmin(
      onApplicaticationSuccess,
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

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  const onSubmit = async (values) => {
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
      countryId: 0,
      stateId: 0,
      lgaId: 0,

      firstName: values.firstName,
      lastName: values.lastName,
      genderId: parseInt(values.gender),
      dateOfBirth: values.dob,
      cityId: parseInt(cityId),
      residentialAddress: values.address,
      location: values.location,
      languages: selectedLanguages,
      emailAddress: values.email,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      academicQualificationId: parseInt(values.education),
      courseOfStudy: values.course,
      applicationMultimedias: multimedia,
      preferredLanguageId: langId,
      postalCode: values.postalCode,
      yearsOfExpertise: values.yearsOfExperience,
      secondaryYearsOfExpertise: values.secondaryYearsOfExpertise,
      attendTechnicalTraining: values.attendTraining,
      trainedOthers: !!parseInt(values.trainedOthers),
      ownSmartPhone: !!parseInt(values.ownPhone),
      socialMedia: !!parseInt(values.socialMedia),
      openForProfessionalTraining: !!parseInt(values.openTraining),
      socialMediaPlatforms: selectedMediaPlatforms,

      preferredCategoryId: parseInt(values.mainCategory),
      subCategories: [...primarySubCategories, ...secondarySubCategories],
    };

    technicianApply(payload);
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

  // fill in the fields for address breakdown on input of address
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
      <AltModalHeader closeModal={closeModal} heading="Create Technician" />

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

        <GlobalCheckbox
          inputName="terms"
          inputValue={values.terms}
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={touched.terms && errors.terms}
          errorMessage={errors.terms}
          labelText="I agree that all documents and information provided are genuine."
        />

        <GlobalBtn
          width="100%"
          type="submit"
          disabled={!values.terms || isApplying}
        >
          {isApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>

      {showMainSubCategories && !!values.mainCategory && (
        <SubCategoriesModal
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
        <SubCategoriesModal
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
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  CreateTechnician
);
