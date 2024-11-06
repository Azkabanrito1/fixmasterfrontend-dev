import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import { FormGroup } from "../../../globalcomponents/Utilities";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useFormik } from "formik";
import styled from "styled-components";
import { FieldError } from "../../../globalcomponents/GlobalInput";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useUpdateTechnician } from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { updateTechSchema } from "../../../../Validations/technicianUpdateStatusValidation";
import moment from "moment/moment";
import { statusOption } from "../../../../utils/selectOptions";
import { capitalizeFirstLetter, getToday } from "../../../../utils/utilityFxns";
import {
  useDeleteUpload,
  useUploadImage,
} from "../../../../hooks/useQueries/useIdentity";

const UpdateTechStatus = ({ isOpen, closeModal, techApplicant }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [uploadedImg, setUploadedImg] = useState({
    id: "",
    url: "",
  });
  const [uploadError, setUploadError] = useState("");

  // Upload Image Callback and Endpoint Call
  const onImgUploadSuccess = (response) =>
    setUploadedImg((prev) => ({ ...prev, ...response.data }));
  const onImgUploadError = (response) =>
    enqueueSnackbar(response.message, { variant: "error" });
  const { mutate: uploadImage } = useUploadImage(
    onImgUploadSuccess,
    onImgUploadError
  );

  // Delete Uploaded Image Callback and Endpoint Call
  const onDeleteSuccess = () => {
    setUploadedImg({ id: "", url: "" });
  };
  const onDeleteError = (response) => onImgUploadError(response);
  const { mutate: deleteImage } = useDeleteUpload(
    onDeleteSuccess,
    onDeleteError
  );

  const dispatch = useDispatch();
  const uploadPic = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    uploadImage(formData);
  };
  const handleImgChange = async (file) => {
    setUploadError("");
    if (uploadedImg) {
      deleteImage(uploadedImg.id);
      setUploadedImg({ id: "", url: "" });
    }
    uploadPic(file);
  };
  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: { "image/png": [".jpeg", ".png", ".jpg"] },
      maxFiles: 1,
      maxSize: 2048000,
      onDrop: (files) => handleImgChange(files[0]),
      //"Status updated successfully",
    });

  useEffect(() => {
    if (techApplicant[0]?.pictureUrl) {
      setUploadedImg({
        url: techApplicant[0]?.pictureUrl,
      });
    }
  }, [techApplicant]);

  const onSuccess = () => {
    enqueueSnackbar("Status updated successfully", {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: updateTechnician } = useUpdateTechnician(
    onSuccess,
    onFailure
  );

  const onSubmit = async (values, actions) => {
    const payload = {
      userId: techApplicant[0]?.userId,
      roleId: techApplicant[0]?.roleId,
      newStatus: values.status,
      effectiveDate: moment(`${values.date} ${values.time}`).toISOString(),
      reasonForChange: values.reasonForChange,
    };
    updateTechnician(payload);
    actions.resetForm();
  };
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        status: "",
        reasonForChange: "",
        date: "",
        time: "",
      },
      validationSchema: updateTechSchema,
      onSubmit,
    });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading="Updated Technician Status"
        closeModal={closeModal}
      />
      <div
        {...getRootProps({
          className: `dropzone ${isDragAccept ? "accepted" : ""} ${
            isDragReject ? "invalid" : ""
          }`,
        })}
        style={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} capture />
        <ProfileImg>
          <img src={uploadedImg.url || "/images/profile.png"} alt="" />
          {uploadError && (
            <FieldError style={{ textAlign: "center" }}>
              {uploadError}
            </FieldError>
          )}
          <div className="mx-4">
            <h3 className="fs-4" style={{ color: "#f26222" }}>
              {capitalizeFirstLetter(techApplicant[0]?.userName)}
            </h3>
            <span
              className="fs-5"
              style={{ placeItems: "center", color: "#60a06e" }}
            >
              {capitalizeFirstLetter(techApplicant[0]?.roleStatus)}
            </span>
          </div>
        </ProfileImg>
      </div>
      <form onSubmit={handleSubmit}>
        <FormGroup columns="1" className="mb-3">
          <GlobalSelect
            labelText="Update Status"
            selectName="status"
            defaultOption="Select status"
            options={statusOption}
            handleBlur={handleBlur}
            handleChange={handleChange}
            valueType="string"
            selectValue={values.status}
            error={errors.status && touched.status}
            errorMessage={errors.status}
          />
        </FormGroup>
        <FormGroup columns="1" className="mb-3">
          <GlobalInput
            labelText="State reason for status change"
            type="text"
            inputName="reasonForChange"
            handleBlur={handleBlur}
            handleChange={handleChange}
            inputPlaceholder="Add comments here"
            inputValue={values.reasonForChange}
            error={errors.reasonForChange && touched.reasonForChange}
            errorMessage={errors.reasonForChange}
          />
        </FormGroup>
        <FormGroup columns="2">
          <GlobalInput
            labelText="Date"
            type="date"
            inputName="date"
            handleBlur={handleBlur}
            handleChange={handleChange}
            inputValue={values.date}
            error={errors.date && touched.date}
            errorMessage={errors.date}
            min={getToday()}
          />
          <GlobalInput
            labelText="Time"
            type="time"
            inputName="time"
            handleBlur={handleBlur}
            handleChange={handleChange}
            inputValue={values.time}
            error={errors.time && touched.time}
            errorMessage={errors.time}
          />
        </FormGroup>
        <GlobalBtn type="submit" className="m-auto mt-3">
          Submit
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default UpdateTechStatus;
const ProfileImg = styled.div`
  display: flex;
  justify-content: start;
  position: relative;
  width: 100%;
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
