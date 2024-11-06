import { useState, useEffect } from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalPhoneInput from "../../../globalcomponents/GlobalPhoneInput";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import { useFormik } from "formik";
import { getMaxDate } from "../../../../utils/dateRanges";
import { AsYouType, parse } from "libphonenumber-js";
import { useDropzone } from "react-dropzone";
import { FieldError } from "../../../globalcomponents/GlobalInput";
import { genderOptions } from "../../../../utils/selectOptions";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import { useSnackbar } from "notistack";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "../../../../hooks/useQueries/useOnboarding";
import {
  useDeleteUpload,
  useUploadImage,
} from "../../../../hooks/useQueries/useIdentity";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { Stack } from "@mui/material";

const styleCamera = { color: "white", marginTop: "auto", marginBottom: "auto" };

function PersonalInfo() {
  const [dobChanged, setDobChanged] = useState(() => {
    const storedValue = localStorage.getItem("dobChanged");
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const setLocalStorageValue = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [uploadedImg, setUploadedImg] = useState({
    id: "",
    url: "",
  });
  const [uploadError, setUploadError] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // useMutation callbacks
  const onFailure = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const onSuccess = () => {
    enqueueSnackbar("Profile updated successfully", { variant: "success" });
  };

  const imgUploadSuccess = (data) => {
    setUploadedImg({ ...data?.data });
  };

  const imgUploadError = (error) => {
    enqueueSnackbar(error.data.message, { variant: "error" });
  };

  // fetch data
  const { data: profileData } = useGetUserProfile();
  const { mutate: updateProfile, isLoading } = useUpdateUserProfile(
    onSuccess,
    onFailure
  );
  const { mutate: uploadImage, isLoading: isUploading } = useUploadImage(
    imgUploadSuccess,
    imgUploadError
  );
  const { mutate: deleteImage } = useDeleteUpload();

  const user = profileData?.user;

  useEffect(() => {
    if (user?.dateOfBirth === "0001-01-01T00:00:00") {
      setDobChanged(false);
      setLocalStorageValue("dobChanged", false);
    }
    const profilePhone = new AsYouType();
    if (user?.firstName) {
      setFieldValue("firstName", user.firstName);
      setFieldValue("lastName", user.lastName);
      setFieldValue("email", user.email);
      setFieldValue("gender", user?.genderId);
      setFieldValue(
        "dob",
        user.dateOfBirth.slice(0, user.dateOfBirth.indexOf("T"))
      );
      setFieldValue("altemail", user?.alternativeEmail);
      setFieldValue("joinLoyalty", String(+user?.isLoyalCustomer));
      setUploadedImg({
        id: user.profilePictureId,
        url: user.profilePictureUrl,
      });
    }
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
    if (user?.dateOfBirth !== "0001-01-01T00:00:00") {
      setDobChanged(true);
      setLocalStorageValue("dobChanged", true);
    }
  }, [user]);

  const maxDate = getMaxDate();

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

  const onSubmit = async (values) => {
    if (!uploadedImg.url) {
      setUploadError("Please upload a profile picture");
      return;
    }

    const payload = {
      firstName: user.firstName,
      middleName: "",
      lastName: user.lastName,
      genderId: parseInt(values.gender),
      dateOfBirth: values.dob,
      phoneNumber: `${selectedCountry.code} ${values.phoneNumber}`,
      email: user.email,
      profilePictureId: uploadedImg.id,
      profilePictureUrl: uploadedImg.url,
      isLoyalCustomer: Boolean(+values.joinLoyalty),
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
      gender: 0,
      dob: "",
      email: "",
      phoneNumber: "",
      joinLoyalty: "",
    },
    onSubmit,
  });

  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/png": [".jpeg", ".png", ".jpg"] },
      maxFiles: 1,
      maxSize: 2048000,
      onDrop: (files) => handleImgChange(files[0]),
    });

  return (
    <div className="mb-5 mb-md-0">
      <h3 className="fw-bold mb-3 fs-6 fs-md-5">Personal Information</h3>

      <GlobalBallBeat loading={isLoading || isUploading} />

      <div
        {...getRootProps({
          className: `dropzone ${isDragAccept ? "accepted" : ""} ${
            isDragReject ? "invalid" : ""
          }`,
        })}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <input {...getInputProps()} capture />
        <ProfileImg>
          <img src={uploadedImg.url || "/images/profile.png"} alt="" />
          {uploadError && (
            <FieldError style={{ textAlign: "center" }}>
              {uploadError}
            </FieldError>
          )}
          <ProfileIcon>
            <FaIcons.FaCamera style={styleCamera} />
          </ProfileIcon>
        </ProfileImg>
      </div>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2" mb="24px">
            <GlobalInput
              labelText="First Name"
              labelColor="var(--clr-primary)"
              inputPlaceholder="Sholawa"
              name="firstName"
              value={values.firstName}
              handleChange={handleChange}
              disabled={true}
            />
            <GlobalInput
              labelText="Last Name"
              labelColor="var(--clr-primary)"
              inputPlaceholder="Bamiyo"
              inputBgColor="#f2f2f2"
              name="lastName"
              value={values.lastName}
              handleChange={handleChange}
              disabled={true}
            />
            <GlobalInput
              labelText="Email Address"
              labelColor="var(--clr-primary)"
              inputPlaceholder="hello@FixMaster.ng"
              name="email"
              value={values.email}
              handleChange={handleChange}
              disabled={true}
            />
            <GlobalPhoneInput
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              labelText="Phone Number"
              labelColor="var(--clr-primary)"
              inputPlaceholder="803 000 0000"
              inputName="phoneNumber"
              inputValue={values.phoneNumber}
              onBlur={handleBlur}
              handleChange={setFieldValue}
              error={errors.phoneNumber && touched.phoneNumber}
              errorMessage={errors.phoneNumber}
            />
            <GlobalSelect
              labelText="Gender"
              selectName="gender"
              options={genderOptions}
              labelColor="var(--clr-primary)"
              defaultOption="Select a gender"
              selectValue={values.gender}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.gender && touched.gender}
              errorMessage={errors.gender}
            />
            <GlobalInput
              type="date"
              width="100%"
              labelColor="var(--clr-primary)"
              labelText="Date of Birth"
              name="dob"
              inputPlaceholder="12/12/1992"
              value={values.dob}
              handleChange={handleChange}
              max={maxDate}
              min={"1900-01-01"}
              disabled={dobChanged}
            />
          </FormGroup>
          <FormGroup columns="1" mb="24px">
            <div>
              <div
                className="description"
                id="loyalty-program"
                style={{ color: "var(--clr-primary)", fontSize: "17px" }}
              >
                Are you interested in joining FixMaster loyalty program?
              </div>
              <Stack
                spacing={2}
                direction={"row"}
                role="group"
                aria-labelledby="loyalty-program"
              >
                <label className="fs-5">
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="joinLoyalty"
                    value={"1"}
                    className="me-2"
                    checked={values.joinLoyalty === "1"}
                  />
                  Yes
                </label>
                <label className="fs-5">
                  <input
                    type="radio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="joinLoyalty"
                    value={"0"}
                    className="me-2"
                    checked={values.joinLoyalty === "0"}
                  />
                  No
                </label>
                {errors.joinLoyalty && touched.joinLoyalty && (
                  <FieldError>{errors.joinLoyalty}</FieldError>
                )}
              </Stack>
            </div>
          </FormGroup>
        </Fields>

        <GlobalBtn
          className="mt-4 mx-auto"
          type="submit"
          width="max-content"
          px="3rem"
          disabled={isLoading}
        >
          Save
        </GlobalBtn>
      </form>
    </div>
  );
}

export default PersonalInfo;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  width: max-content;
  margin-bottom: 2rem;

  & img {
    box-sizing: border-box;

    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;

    background: transparent;
    border: 1px solid var(--clr-primary);
  }
`;

const ProfileIcon = styled.div`
  margin-top: 85px;
  margin-left: 70px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  position: absolute;

  background: var(--clr-primary);
`;
