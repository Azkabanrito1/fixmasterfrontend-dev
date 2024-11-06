import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import scriptLoader from "react-async-script-loader";
import {
  useCreateFranchiseeByAdmin,
  useGetQualifications,
} from "../../../../hooks/useQueries/useOnboarding";
import { useGetTerritoriesByGeolocation } from "../../../../hooks/useQueries/useAdmin";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import PersonalInfoFormGroup from "../../../globalcomponents/globalformgroups/PersonalInformation";
import ContactInfoFormGroup from "../../../globalcomponents/globalformgroups/ContactInformationFormGroup";
import AddressInfoFormGroup from "../../../globalcomponents/globalformgroups/AddressInformation";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import AcademicInfoFormGroup from "../../../globalcomponents/globalformgroups/AcademicInfoFormGroup";
import FranchiseeXPFormGroup from "../../../globalcomponents/globalformgroups/FranchiseeExperienceFormGroup";
import DocumentsFormGroup from "../../../globalcomponents/globalformgroups/DocumentsFormGroup";
import { Fields } from "../../../globalcomponents/Utilities";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";
import { registerFranchiseeSchema } from "../../../../Validations/franchiseeRegValidations";
import { useGetLgaByStateName } from "../../../../hooks/useQueries/useIdentity";

const RegisterFranchisee = ({ isOpen, closeModal, isScriptLoadSucceed }) => {
  const [uploadResponse, setUploadResponse] = useState([]);
  const [internalErrors, setInternalErrors] = useState("");
  const [lgaId, setLgaId] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  // -------------------------------mutations--------------------------------
  const onApplicaticationSuccess = () => {
    enqueueSnackbar("Franchisee created successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onApplicaticationFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: authFranchiseeApply, isLoading: authIsApplying } =
    useCreateFranchiseeByAdmin(
      onApplicaticationSuccess,
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

    const payload = {
      countryId: 0,
      stateId: 0,
      lgaId: 0,
      cityId: addressComponents.cityIdResult,
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
      haveFunds: Boolean(values.haveFunds),
      howMuch: values.howMuch,
      applicationMultimedias: multimedia,
      landmark: values.landmarks,
      referralCode: "",
    };

    authFranchiseeApply(payload);
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
      landmarks: "",
      territory: "",
      education: "",
      course: "",
      runBusiness: "",
      management: "",
      marketing: "",
      haveFunds: "",
      howMuch: "",
      cv: null,
      coverLetter: null,
      terms: false,
    },
    validationSchema: registerFranchiseeSchema,
    onSubmit,
  });

  // variables to be used
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
    locationName: "landmarks",
  };

  const isVacantTerritory = territoryAvailable?.data.status === "004";

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={false}
    >
      <AltModalHeader
        closeModal={closeModal}
        heading="Franchisee Creation Form"
      />

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
          inputNames={inputNames}
          inputRef={inputRef}
          withLocation={true}
        />

        {!!territoryAvailable?.data.message && (
          <div className="mb-3">
            {isVacantTerritory ? (
              <p className="fs-4 text-bold text-center text-success">
                {territoryAvailable?.data.message}
              </p>
            ) : (
              <div>
                <p className="fs-4 text-bold text-center text-danger">
                  {territoryAvailable?.data.message}
                </p>
                {territoryAvailable?.data.status === "004" && (
                  <div className="text-center my-3">
                    <GlobalBtn width="max-content" px="2rem" type="button">
                      Go to Territory Management
                    </GlobalBtn>
                  </div>
                )}
              </div>
            )}
          </div>
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

        <GlobalBtn
          width="100%"
          type="submit"
          disabled={!isVacantTerritory || !values.terms || authIsApplying}
        >
          {authIsApplying ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default scriptLoader([process.env.REACT_APP_PLACES_API_URL])(
  RegisterFranchisee
);
