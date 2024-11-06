import { useSnackbar } from "notistack";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import {
  FieldError,
  InputGroup,
} from "../../../../globalcomponents/GlobalInput";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { useUploadTrainingMCQ } from "../../../../../hooks/useQueries/useAdmin";
import { useFormik } from "formik";
import { FormGroup } from "../../../../globalcomponents/Utilities";
import { useGetCategories } from "../../../../../hooks/useQueries/useOnboarding";

const MCQExcelForm = ({ isOpen, closeModal, folderId, useCategory }) => {
  const { enqueueSnackbar } = useSnackbar();

  // ================data fetching =============================
  const { data: categoryData } = useGetCategories();

  // =========================mutations =========================
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: uploadMcqs } = useUploadTrainingMCQ({
    folderId,
    onSuccess,
    onFailed,
  });

  // ================================actions ================================
  const onSubmit = (values) => {
    const payload = new FormData();
    payload.append("FolderId", folderId);
    payload.append("CategoryId", values.categoryId);
    payload.append("File", values.file);

    uploadMcqs(payload);
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
      categoryId: 0,
      file: null,
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={"Upload MCQ Questions"}
      />

      <p className="text-center">
        Download sample excel file{" "}
        <a download={"Mcq excel format"} href="/docs/MCQExcelFormat.xlsx">
          here
        </a>
      </p>

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" className="mb-4">
          {useCategory && (
            <GlobalSelect
              labelText={"Category"}
              defaultValue={0}
              defaultOption={"No specific category"}
              descriptionText={"Specific to Technician and QA Masters"}
              selectName={"categoryId"}
              selectValue={values.categoryId}
              handleChange={handleChange}
              options={categoryData?.data}
              required
            />
          )}

          <InputGroup>
            <label htmlFor="file">
              Training Material<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              required
              accept={".xlsx"}
              onBlur={handleBlur}
              onChange={(e) => setFieldValue("file", e.target.files[0])}
            />
            {errors.file && touched.file && (
              <FieldError>{errors.file}</FieldError>
            )}
          </InputGroup>
        </FormGroup>

        <GlobalBtn mx="auto" type="submit">
          Upload MCQs
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default MCQExcelForm;
