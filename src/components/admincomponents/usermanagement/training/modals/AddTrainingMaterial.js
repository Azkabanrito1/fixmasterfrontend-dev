import { useFormik } from "formik";
import GlobalInput, {
  FieldError,
  InputGroup,
} from "../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import { FormGroup } from "../../../../globalcomponents/Utilities";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { useCreateMaterial } from "../../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalFullScreenLoader from "../../../../globalcomponents/GlobalFullScreenLoader";

const AddTrainingMaterial = ({ isOpen, closeModal, folderId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: addMaterial, isLoading } = useCreateMaterial({
    folderId,
    onSuccess,
    onFailed: onError,
  });

  // ========================actions =================
  const onSubmit = (values) => {
    const payload = new FormData();
    payload.append("Name", values.name);
    payload.append("FolderId", folderId);
    payload.append("MaterialFile", values.file);
    payload.append("ContentType", values.contentType);

    addMaterial(payload);
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
      name: "",
      file: null,
      contentType: "",
    },
    onSubmit,
  });

  const fileTypes = [
    { id: 1, name: "Video" },
    { id: 2, name: "Document" },
  ];

  const docFiles = ".pdf";
  const videoFiles = ["video/mp4", "video/wmv"];
  const accept = values.contentType === "Document" ? docFiles : videoFiles;

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={"Add Training Material"}
      />

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" className="mb-4">
          <GlobalInput
            labelText="Material Name"
            inputName="name"
            inputValue={values.name}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={touched.name && errors.name}
            errorMessage={errors.name}
          />

          <GlobalSelect
            labelText="File Type"
            selectName="contentType"
            selectValue={values.contentType}
            defaultOption={"Select File Type"}
            options={fileTypes}
            handleBlur={handleBlur}
            handleChange={handleChange}
            valueType={"string"}
            error={touched.contentType && errors.contentType}
            errorMessage={errors.contentType}
          />

          {!!values.contentType && (
            <InputGroup>
              <label htmlFor="file">
                Training Material<span className="text-danger">*</span>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                required
                accept={accept}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("file", e.target.files[0])}
              />
              {errors.file && touched.file && (
                <FieldError>{errors.file}</FieldError>
              )}
            </InputGroup>
          )}
        </FormGroup>

        <GlobalBtn mx="auto" type="submit">
          Add Material
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default AddTrainingMaterial;
