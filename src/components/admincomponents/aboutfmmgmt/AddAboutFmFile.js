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
import { useUploadFmFiles } from "../../../hooks/useQueries/useAdmin";

const AddAboutFmFile = ({ isOpen, closeModal, folderId, folderName }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: uploadFile, isLoading } = useUploadFmFiles({
    folderId,
    onSuccess,
    onFailed: onError,
  });

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
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={`Add ${folderName} File`}
      />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="1" className="mb-4">
          <InputGroup>
            <label htmlFor="file">
              {folderName} File<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              required
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

export default AddAboutFmFile;
