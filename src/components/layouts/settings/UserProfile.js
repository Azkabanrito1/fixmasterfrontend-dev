import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { AsYouType } from "libphonenumber-js";
import { useDropzone } from "react-dropzone";
import {
  Container,
  PageHeading,
  BackBtn,
  FormGroup,
  ProfilePicture,
  GroupHeading,
  Fields,
} from "../../globalcomponents/Utilities";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { docType, genderOptions, prefixes } from "../../../utils/selectOptions";
import { getMaxDate } from "../../../utils/dateRanges";
import { useSnackbar } from "notistack";
import moment from "moment";
import { BallBeat } from "react-pure-loaders";
import {
  useDeleteUpload,
  useUploadImage,
} from "../../../hooks/useQueries/useIdentity";
import {
  useGetStageId,
  useGetUserProfile,
  useUpdateUserProfile,
} from "../../../hooks/useQueries/useOnboarding";
import { franchiseeProfileValidation } from "../../../Validations/profileValidation";
import useProfileRouter from "../../../hooks/useProfileRouter";
import useLoginDetails from "../../../hooks/useLoginDetails";
import { capitalizeFirstLetter } from "../../../utils/utilityFxns";

const UserProfile = ({ canSelectContractType }) => {
  const [uploadedImg, setUploadedImg] = useState({
    id: "",
    url: "",
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [selectedAltCountry, setSelectedAltCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [uploadError, setUploadError] = useState("");
  const top = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useProfileRouter();
  const { role } = useLoginDetails();
  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/png": [".jpeg", ".png", ".jpg"] },
      maxFiles: 1,
      maxSize: 2048000,
      onDrop: (files) => handleImgChange(files[0]),
    });
  const { data: loginStage } = useGetStageId();
  const onboarding = loginStage?.data || {};

  // useMutation callbacks
  const onFailure = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const onSuccess = () => {
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
    if (!onboarding.isCompleted) {
      router(role);
    }
  };

  const imgUploadSuccess = (data) => {
    setUploadedImg({ ...data?.data });
  };

  const imgUploadError = (error) => {
    enqueueSnackbar(error.data.message, { variant: "error" });
  };

  // fetch data
  const { data: profileData } = useGetUserProfile();

  const { mutate: updateProfile, isLoading: isSubmitting } =
    useUpdateUserProfile(onSuccess, onFailure);
  const { mutate: uploadImage, isLoading: isUploading } = useUploadImage(
    imgUploadSuccess,
    imgUploadError
  );
  const { mutate: deleteImage } = useDeleteUpload();

  const user = profileData?.user;
  const maxDate = getMaxDate();

  // get and initialize fields with already set profile data
  useEffect(() => {
    const profilePhone = new AsYouType();
    const altProfilePhone = new AsYouType();
    if (user?.firstName) {
      setFieldValue("prefix", capitalizeFirstLetter(user.prefix) || "");
      setFieldValue("firstName", user?.firstName);
      setFieldValue("lastName", user?.lastName);
      setFieldValue("email", user?.email);
      setFieldValue("gender", user?.genderId);
      setFieldValue("dob", moment(user?.dateOfBirth).format("yyyy-MM-DD"));
      setUploadedImg({
        id: user.profilePictureId,
        url: user.profilePictureUrl,
      });
    }
    if (!!user?.alternativeEmail)
      setFieldValue("altemail", user?.alternativeEmail);
    if (user?.phoneNumber) {
      profilePhone.input(user.phoneNumber);
      const countryAbbr = profilePhone?.getCountry();
      const countryCode = profilePhone?.getCallingCode();
      const phoneNo = profilePhone?.formattedOutput?.replace(
        `${selectedCountry.code} `,
        ""
      );
      setSelectedCountry({
        code: `+${countryCode}`,
        abbr: countryAbbr,
      });
      setFieldValue("phoneNumber", phoneNo);
    }
    if (user?.alternativePhoneNumber) {
      altProfilePhone?.input(user?.alternativePhoneNumber);
      const altCountryAbbr = altProfilePhone?.getCountry();
      const altCountryCode = altProfilePhone?.getCallingCode();
      const altPhoneNo = altProfilePhone?.formattedOutput?.replace(
        `${selectedAltCountry.code} `,
        ""
      );
      setSelectedAltCountry({
        code: `+${altCountryCode}`,
        abbr: altCountryAbbr,
      });
      setFieldValue("altphoneNumber", altPhoneNo);
    }
  }, [user]);

  // upload image
  const uploadPic = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    uploadImage(formData);
    enqueueSnackbar("Uploading...", { variant: "info" });
  };

  const handleImgChange = async (file) => {
    setUploadError("");
    if (uploadedImg) {
      deleteImage(uploadedImg.id);
      setUploadedImg({ id: "", url: "" });
    }
    uploadPic(file);
  };

  // const accepted = {
  //   "application/pdf": [".pdf"],
  // };

  // const removeFile = (name) => {
  //   setFieldValue(name, "");
  // };

  const onSubmit = async () => {
    top.current.scrollIntoView("block");

    let formatPhone = values.phoneNumber;
    if (formatPhone.at(0) === "0") formatPhone = formatPhone.slice(1);

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: "",
      dateOfBirth: values.dob,
      phoneNumber: `${selectedCountry.code} ${values.phoneNumber}`,
      alternativePhoneNumber: values.altphoneNumber
        ? `${selectedAltCountry.code} ${values.altphoneNumber}`
        : "",
      email: user.email,
      alternativeEmail: values.altemail,
      profilePictureId: uploadedImg.id,
      profilePictureUrl: uploadedImg.url,
      employmentType: parseInt(values.contractType),
      genderId: parseInt(values.gender),
      company: "",
      durationInResidentialAdress: 0,
      usersRole: "",
      id: "",
      referedBy: "",
      userReferalCode: "",
      residentialAdress: "",
      accountStatus: "",
      prefix: values.prefix,
      verificationIdentityType: values.docType,
      verificationIdentity: values.identificationNumber,
    };

    updateProfile(payload);
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
      gender: "",
      dob: "",
      email: "",
      altemail: "",
      phoneNumber: "",
      altphoneNumber: "",
      contractType: 0,
      prefix: "",
      identificationNumber: "",
      docType: "",
    },
    validationSchema: franchiseeProfileValidation,
    onSubmit,
  });

  const identificationNumberText =
    values.docType === "Passport"
      ? "Passport Number"
      : values.docType === "National ID (NIN)"
      ? "National ID (NIN) Number"
      : values.docType === "Driver's License"
      ? "Driver's License Number"
      : values.docType === "Voter's Card"
      ? "Voter's Card Number"
      : "";
  const placeHolderText =
    values.docType === "Passport"
      ? "Enter your passport number"
      : values.docType === "National ID (NIN)"
      ? "Enter your NIN Number"
      : values.docType === "Driver's License"
      ? "Enter your Driver's License Number"
      : values.docType === "Voter's Card"
      ? "Enter your Voter's Card Number"
      : "";

  return (
    <>
      <ProfileContainer>
        {onboarding.stageName?.includes("profile") && <BackBtn />}

        <div>
          <PageHeading ref={top}>Personal Profile Settings</PageHeading>
          <p>Please update your profile settings to continue</p>
          {profileData?.user?.genderId > 0 && <BackBtn />}
        </div>

        <div className="text-center">
          <BallBeat
            loading={isUploading || isSubmitting}
            color="var(--clr-primary)"
          />
        </div>
        <div>
          <div
            style={{
              width: "250px",
              marginInline: "auto",
              marginBottom: "24px",
              textAlign: "center",
            }}
            {...getRootProps({
              className: `dropzone ${isDragAccept ? "accepted" : ""} ${
                isDragReject ? "invalid" : ""
              }`,
            })}
          >
            <input {...getInputProps()} capture />
            <ProfilePicture
              src={uploadedImg.url || "/images/profile.png"}
              alt="profile picture"
            />
            {uploadError && (
              <FieldError style={{ textAlign: "center" }}>
                {uploadError}
              </FieldError>
            )}
            <GlobalBtn
              height="40px"
              width="max-content"
              mx="auto"
              px="0"
              py="0"
              bgClr="transparent"
              hoverBg="transparent"
              color="#000"
              hoverClr="var(--clr-primary)"
              fw="500"
            >
              Upload Profile Picture
              <img src="/images/edit.png" alt="edit profile picture" />
            </GlobalBtn>
          </div>
        </div>

        <div role="group">
          <form onSubmit={handleSubmit}>
            <FormGroup columns="2">
              <GlobalSelect
                labelText={"Prefix"}
                selectName={"prefix"}
                defaultOption={"Select Prefix"}
                selectValue={values.prefix}
                options={prefixes}
                valueType="string"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={touched.prefix && errors.prefix}
                errorMessage={errors.prefix}
                required={true}
              />
              <GlobalInput
                inputName="firstname"
                labelText="First Name"
                inputValue={values.firstName}
                handleChange={handleChange}
                readOnly
              />

              <GlobalInput
                inputName="lastname"
                labelText="Last Name"
                inputValue={values.lastName}
                handleChange={handleChange}
                readOnly
              />

              <GlobalSelect
                labelText="Gender"
                selectName="gender"
                options={genderOptions}
                defaultOption="Select a gender"
                selectValue={values.gender}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.gender && touched.gender}
                errorMessage={errors.gender}
              />

              <GlobalInput
                inputType="date"
                inputName="dob"
                labelText="Date Of Birth"
                inputValue={values.dob}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.dob && touched.dob}
                errorMessage={errors.dob}
                max={maxDate}
                min={"1900-01-01"}
              />

              <GlobalInput
                inputType="email"
                inputName="email"
                labelText="Email"
                inputValue={values.email}
                readOnly
              />

              <GlobalInput
                inputType="email"
                inputName="altemail"
                labelText="Alternate Email"
                inputValue={values.altemail}
                inputPlaceholder="hello@FixMaster.com.ng"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.altemail && touched.altemail}
                errorMessage={errors.altemail}
              />

              <GlobalPhoneInput
                labelText="Phone Number"
                inputName="phoneNumber"
                inputPlaceholder="803 334 4556"
                inputValue={values.phoneNumber}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                handleBlur={handleBlur}
                handleChange={setFieldValue}
                error={errors.phoneNumber && touched.phoneNumber}
                errorMessage={errors.phoneNumber}
              />

              <GlobalPhoneInput
                labelText="Alternative Phone Number"
                inputName="altphoneNumber"
                inputPlaceholder="803 334 4556"
                inputValue={values.altphoneNumber}
                selectedCountry={selectedAltCountry}
                setSelectedCountry={setSelectedAltCountry}
                handleBlur={handleBlur}
                handleChange={setFieldValue}
                error={errors.altphoneNumber && touched.altphoneNumber}
                errorMessage={errors.altphoneNumber}
              />
            </FormGroup>

            {/* {canSelectContractType && (
              <Fields>
                <GroupHeading>What job type are you Applying For?</GroupHeading>
                <FormGroup columns="1">
                  <div>
                    <div className="description" id="cseRole-radio-group">
                      Please select the job type you are applying for
                    </div>
                    <div role="group" aria-labelledby="cseRole-radio-group">
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="contractType"
                          value={2}
                          required
                        />
                        Contract
                      </label>
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="contractType"
                          value={1}
                          required
                        />
                        Full Time
                      </label>
                      <label>
                        <input
                          type="radio"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name="contractType"
                          value={3}
                          required
                        />
                        Freelance
                      </label>
                      {errors.contractType && touched.contractType && (
                        <FieldError>{errors.contractType}</FieldError>
                      )}
                    </div>
                  </div>
                </FormGroup>
              </Fields>
            )} */}

            <Fields>
              <GroupHeading>Key Identification Documents</GroupHeading>
              <FormGroup columns="2">
                <GlobalSelect
                  labelText={"Document"}
                  selectName={"docType"}
                  selectValue={values.docType}
                  defaultOption={"Select Document"}
                  options={docType}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  valueType="string"
                  errorMessage={errors.docType}
                  error={errors.docType && touched.docType}
                  required={true}
                />
                {values.docType && (
                  <GlobalInput
                    inputType="text"
                    inputName="identificationNumber"
                    labelText={identificationNumberText}
                    inputValue={values.identificationNumber}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={
                      errors.identificationNumber &&
                      touched.identificationNumber
                    }
                    errorMessage={errors.identificationNumber}
                    inputPlaceholder={placeHolderText}
                    required
                    maxLength={12}
                  />
                )}
              </FormGroup>
            </Fields>

            <GlobalBtn type="submit" width="100%">
              {onboarding?.stageId < 4 ? "Next" : "Save"}
            </GlobalBtn>
          </form>
        </div>
      </ProfileContainer>
    </>
  );
};

export default UserProfile;

const ProfileContainer = styled(Container)`
  padding-top: 16px;
  border-radius: 0.5rem;
  height: calc(100vh - 110px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1px; /* width of the entire scrollbar */
  }

  & > div {
    max-width: 720px;
    padding-block: 0;
  }

  form {
    & > div {
      margin-bottom: 24px;
    }

    & > button {
      margin-block: 76px;
    }
  }
`;
