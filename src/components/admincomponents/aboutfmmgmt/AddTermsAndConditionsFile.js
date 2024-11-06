import { useFormik } from "formik";
import GlobalInput, {
  FieldError,
  InputGroup,
} from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import {
  useUploadFmFiles,
  useUploadTermsAndConditions,
} from "../../../hooks/useQueries/useAdmin";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import { termsAndConditionsValidationSchema } from "../../../Validations/TermsAndConditionsFileValidation";

const AddTermsAndConditionsFile = ({ isOpen, closeModal }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { data: rolesData } = useGetCollaboratorRoles();

  // ========================actions =================
  const onSubmit = (values) => {
    const payload = new FormData();
    payload.append("files", values.file);

    uploadFile(payload);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: termsAndConditionsValidationSchema,
    onSubmit,
  });

  const { mutate: uploadFile, isLoading } = useUploadTermsAndConditions({
    collabId: values.collaborator,
    onSuccess,
    onFailed: onError,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={`Add Terms and Conditions File`}
      />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" className="mb-4">
          <GlobalSelect
            labelText="Collaborator"
            selectName="collaborator"
            defaultOption="Select Collaborator"
            selectValue={values.gender}
            options={rolesData?.data}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.collaborator && touched.collaborator}
            errorMessage={errors.collaborator}
            required
          />
          <InputGroup>
            <label htmlFor="file">
              Terms and Conditions File<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              required
              accept=".pdf"
              onBlur={handleBlur}
              onChange={(e) => setFieldValue("file", e.target.files[0])}
            />
            {errors.file && touched.file && (
              <FieldError>{errors.file}</FieldError>
            )}
          </InputGroup>
        </FormGroup>

        <GlobalBtn mx="auto" type="submit">
          Add File
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default AddTermsAndConditionsFile;
