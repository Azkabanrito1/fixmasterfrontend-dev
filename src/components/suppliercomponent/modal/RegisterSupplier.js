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
  useSupplierApplication,
} from "../../../hooks/useQueries/useOnboarding";
import {
  useCreateAddressOnRequest,
  useGetUserProfile,
} from "../../../hooks/useQueries/useIdentity";
import ModalHeader from "../../layouts/modal/ModalHeader";
import PersonalInfoFormGroup from "../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import LogoutUser from "../../globalcomponents/globalformgroups/LogoutUser";
import LanguageInfoFormGroup from "../../globalcomponents/globalformgroups/LanguageInfoFormGroup";
import SubCategory from "../../globalcomponents/modals/SubCategoriesModal";
import usePhoneBreakdown from "../../../hooks/usePhoneBreakdown";
import SupplierAnswers from "../../globalcomponents/globalformgroups/SupplierAnswers";
import { registerSupplierSchema } from "../../../Validations/addSupplierValidation";
import useLoginDetails from "../../../hooks/useLoginDetails";
import moment from "moment";
import DocumentsFormGroup from "../../globalcomponents/globalformgroups/DocumentsFormGroup";
import SpecializationsFormGroup from "../../globalcomponents/globalformgroups/SpecializationsFormGroup";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";
import AddressInfoFormGroup from "../../globalcomponents/globalformgroups/AddressInformation";
import {
  useGetRootCategories,
  useGetRootSubcatById,
} from "../../../hooks/useQueries/useAdmin";
import { Link } from "react-router-dom";
import SupplierTerms from "./SupplierTerms";

const RegisterSupplier = ({
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
  const [cityId, setCityId] = useState("");
  const [shopcityId, setShopCityId] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const shopRef = useRef(null);
  const addressRef = useRef(null);
  const { isExpired } = useLoginDetails();
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, addressRef);
  const shopAddressComponents = useGooglePlaces(isScriptLoadSucceed, shopRef);
  const [openTermsModal, setOpenTermsModal] = useState(false);

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
  const onCreateSuccess = ({ createResponse1, createResponse2 }) => {
    window.scrollTo(0, 0);
    setInternalErrors("");

    const multimedia = uploadResponse.map((response, index) => {
      return {
        id: index,
        attachmentType: response.contentType.toLowerCase(),
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
      firstName: values.firstName,
      lastName: values.lastName,
      genderId: parseInt(values.gender),
      dateOfBirth: values.dob,
      candidateResistialCityId: createResponse1?.data?.data?.cityIdResult,
      candidateResidentialAddress: values.address,
      languages: selectedLanguages,
      emailAddress: values.email,
      phoneNumber: values.phoneNo
        ? `${selectedCountry.code} ${values.phoneNo}`
        : "",
      preferredLanguageId: langId,
      // preferredCategoryId: parseInt(values.mainCategory),
      subCategories: [...primarySubCategories, ...secondarySubCategories],
      candidateOfficeCityId: createResponse2?.data?.data?.cityIdResult,
      candidateOfficeAddress: values.shopAddress,
      yearsOfTrading: values.trading,
      branches: values.branch,
      coporateCustomers: values.corporateCustomer,
      warranty: values.warranty,
      supplierMultiMedias: multimedia,
      referralCode: values.referral,
      longitude,
      latitude,
      landmark: values.officeLocation,
    };
    supplierApply(payload);
  };

  const { mutate: supplierApply, isLoading: isApplying } =
    useSupplierApplication(onApplicaticationSuccess, onApplicaticationFailure);

  const { mutateAsync: createAddress } = useCreateAddressOnRequest(
    undefined,
    onApplicaticationFailure
  );
  const createAddresses = async (payload1, payload2) => {
    const createResponse1 = await createAddress(payload1);
    const createResponse2 = await createAddress(payload2);

    onCreateSuccess({ createResponse1, createResponse2 });
  };
  // --------------------------fetching data--------------------------
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

  const removeFile = (name) => {
    setFieldValue(name, "");
  };

  const onSubmit = async (values) => {
    const payload1 = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };
    const payload2 = {
      country: "Nigeria",
      state: values.officeState,
      lga: values.officeLga,
      city: values.officeCity,
    };

    createAddresses(payload1, payload2);
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
      officeState: "",
      officeCity: "",
      officeLga: "",
      address: "",
      shopAddress: "",
      languages: [],
      preferredLanguage: "",
      mainCategory: "",
      branch: "",
      corporateCustomer: "",
      yearsCategory: "",
      trading: "",
      warranty: "",
      referral: "",
      cac: null,
      coverLetter: null,
      terms: false,
      location: "",
      officeLocation: "",
    },
    validationSchema: registerSupplierSchema,
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

  // fill in the fields for address breakdown on input of address and shop address
  useEffect(() => {
    const { state, lga, city, cityIdResult } = addressComponents;
    if (state) {
      setFieldValue("state", state);
      setFieldValue("lga", lga);
      setFieldValue("city", city);
      setCityId(cityIdResult);
    }
    if (addressRef.current) setFieldValue("address", addressRef.current.value);
  }, [addressComponents, addressRef]);

  useEffect(() => {
    const { state, lga, city, cityIdResult, longitude, latitude } =
      shopAddressComponents;

    if (state) {
      setFieldValue("officeState", state);
      setFieldValue("officeLga", lga);
      setFieldValue("officeCity", city);
      setShopCityId(cityIdResult);
      setLongitude(longitude);
      setLatitude(latitude);
    }
    if (shopRef.current) setFieldValue("shopAddress", shopRef.current.value);
  }, [shopAddressComponents, shopRef]);

  const handleLogout = () => {
    closeModal();
    openMemberAlready();
  };

  useEffect(() => {
    setFieldValue("mainSubCategories", []);
  }, [values.mainCategory]);

  useEffect(() => {
    setFieldValue("otherSubCategories", []);
  }, [values.otherCategory]);

  const openMainSubModal = () => setShowMainSubCategories(true);
  const closeMainSubModal = () => setShowMainSubCategories(false);
  const openOtherSubModal = () => setShowOtherSubCategories(true);
  const closeOtherSubModal = () => setShowOtherSubCategories(false);

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  const languages = languageData?.data?.filter((lang) =>
    values.languages.includes(lang.name)
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
        title="Supplier Application Form"
        subHeading="Kindly complete the form below to apply for the franchisee role at
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
        />

        <AddressInfoFormGroup
          title="Candidate’s Residential Address Information"
          formikHandlers={formikHandlers}
          inputRef={addressRef}
          inputNames={{
            addressName: "address",
            stateName: "state",
            lgaName: "lga",
            cityName: "city",
            locationName: "location",
          }}
          withLocation={true}
        />

        <AddressInfoFormGroup
          title="Candidate’s Office/Shop Address Information"
          formikHandlers={formikHandlers}
          inputRef={shopRef}
          inputNames={{
            addressName: "shopAddress",
            stateName: "officeState",
            lgaName: "officeLga",
            cityName: "officeCity",
            locationName: "officeLocation",
          }}
          withLocation={true}
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

        <SupplierAnswers formikHandlers={formikHandlers} />

        <DocumentsFormGroup
          isSupplier={true}
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
          closeModal={closeOtherSubModal}
          subCategoriesData={otherSubCategoryData}
          selectedCategories={values.otherSubCategories}
        />
      )}
      {openTermsModal && (
        <SupplierTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`SUPPLIER TERMS AND CONDITIONS`}
        />
      )}
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  RegisterSupplier
);
