import { useFormik } from "formik";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import { Fields, FormGroup } from "../../../../globalcomponents/Utilities";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import {
  useCreateFolder,
  useGetRootCategories,
} from "../../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalTextArea from "../../../../globalcomponents/GlobalTextArea";
import { useLocation } from "react-router-dom";
import { colors } from "@mui/material";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";

const AddTrainingFolder = ({ isOpen, closeModal, testTypeId }) => {
  const { enqueueSnackbar } = useSnackbar();

  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  }

  function onFailed(response) {
    enqueueSnackbar(response.message || response.title, { variant: "error" });
  }

  const { data: rootCategories } = useGetRootCategories();

  const { mutate: createFolder, isLoading } = useCreateFolder({
    onSuccess,
    onFailed,
    testTypeId,
  });

  const location = useLocation();

  const getDynamicSegment = () => {
    const pathSegments = location.pathname.split("/");
    const index = pathSegments.findIndex((segment) => segment === "training");
    if (index !== -1 && index + 1 < pathSegments.length) {
      return pathSegments[index + 1];
    }
    return null;
  };

  const mcqType = getDynamicSegment();
  const getRoleSegment = () => {
    const pathSegments = location.pathname.split("/");
    const index = pathSegments.findIndex((segment) => segment === "user-mgmt");
    if (index !== -1 && index + 1 < pathSegments.length) {
      return pathSegments[index + 1]; // This returns the segment after 'user-mgmt'
    }
    return null;
  };

  const collaborator = getRoleSegment();

  const onSubmit = () => {
    const payload = {
      name: values.name,
      mcqCollaboaratorTbId: testTypeId,
      timeAllocated:
        mcqType === "aptitude" || mcqType === "interview" ? null : values.timeAllocated,
      passMark: mcqType === "aptitude" || mcqType === "interview" ? null : values.passMark,
      maxAttemptAllowed:
        mcqType === "aptitude" || mcqType === "interview" ? null : values.maxAttemptAllowed,
      promptTime:
        mcqType === "aptitude" || mcqType === "interview" ? null : values.promptTime,
      questionPerExam: values.questionPerExam,
      videoRecordingTime:
        mcqType === "aptitude" || mcqType === "interview"
          ? null
          : values.videoRecordingTime,
      description: values.description,
      category:
        mcqType === "aptitude" && collaborator === "technician"
          ? categoryId?.id
          : null,
    };

    createFolder(payload);
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        timeAllocated: 0,
        passMark: 0,
        maxAttemptAllowed: 0,
        promptTime: 0,
        questionPerExam: 0,
        videoRecordingTime: 0,
        description: "",
        category: 0,
      },
      onSubmit,
    });

  const categoryId = rootCategories?.data?.find(
    (category) => category.name === values.category
  );

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal} heading={"Add Training Folder"} />

      {mcqType === "aptitude" || mcqType === "interview" ? (
        <form onSubmit={handleSubmit}>
          <Fields>
            <FormGroup columns="2">
              <GlobalInput
                labelText="Folder Name"
                inputPlaceholder="Add folder name"
                inputName="name"
                inputValue={values.name}
                error={touched.name && errors.name}
                errorMessage={errors.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
              <GlobalInput
                labelText="Total No of Questions in Bucket"
                inputName="questionPerExam"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.questionPerExam}
                errorMessage={errors.questionPerExam}
                error={touched.questionPerExam && errors.questionPerExam}
                min="0"
              />
              {mcqType === "aptitude" && collaborator === "technician" && (
                <GlobalSelect
                  labelText="Category"
                  selectName="category"
                  valueType="string"
                  selectValue={values.category}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  options={rootCategories?.data}
                  defaultOption={"Select Category"}
                  error={errors.category && touched.category}
                  errorMessage={errors.category}
                  required={true}
                />
              )}
            </FormGroup>
            <GlobalTextArea
              className="mt-4"
              labelText="Folder Description"
              inputPlaceholder="describe the content of this folder"
              inputName="description"
              handleBlur={handleBlur}
              handleChange={handleChange}
              inputValue={values.description}
              errorMessage={errors.description}
              error={touched.description && errors.description}
            />
          </Fields>

          <GlobalBtn type="submit" mx="auto">
            Add
          </GlobalBtn>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <Fields>
            <FormGroup columns="2">
              <GlobalInput
                labelText="Folder Name"
                inputName="name"
                inputPlaceholder="Add folder name"
                inputValue={values.name}
                error={touched.name && errors.name}
                errorMessage={errors.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required
              />
              <GlobalInput
                labelText="Exam Time Allocated (mins)"
                inputName="timeAllocated"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.timeAllocated}
                errorMessage={errors.timeAllocated}
                error={touched.timeAllocated && errors.timeAllocated}
                min="0"
              />
              <GlobalInput
                labelText="Pass Mark (%)"
                inputName="passMark"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.passMark}
                errorMessage={errors.passMark}
                error={touched.passMark && errors.passMark}
                max="100"
                min="0"
              />
              <GlobalInput
                labelText="Total No of Questions in Bucket"
                inputName="questionPerExam"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.questionPerExam}
                errorMessage={errors.questionPerExam}
                error={touched.questionPerExam && errors.questionPerExam}
                min="0"
              />
              <GlobalInput
                labelText="Max Attempts Allowed"
                descriptionText="Leave as 0 if there is no restriction on attempts allowed"
                inputName="maxAttemptAllowed"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.maxAttemptAllowed}
                errorMessage={errors.maxAttemptAllowed}
                error={touched.maxAttemptAllowed && errors.maxAttemptAllowed}
                min="0"
              />
              <GlobalInput
                labelText="Prompt Time (mins)"
                descriptionText="What time should the exam taker get a prompt"
                inputName="promptTime"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.promptTime}
                errorMessage={errors.promptTime}
                max={values.timeAllocated}
                error={touched.promptTime && errors.promptTime}
                min="0"
              />
              <GlobalInput
                labelText="Video Recording Time (secs)"
                descriptionText="higher value causes a longer mcq video submission time"
                inputName="videoRecordingTime"
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                inputValue={values.videoRecordingTime}
                errorMessage={errors.videoRecordingTime}
                max="60"
                error={touched.videoRecordingTime && errors.videoRecordingTime}
                min="0"
              />
            </FormGroup>
            <GlobalTextArea
              className="mt-4"
              labelText="Folder Description"
              descriptionText="describe the content of this folder"
              inputName="description"
              handleBlur={handleBlur}
              handleChange={handleChange}
              inputValue={values.description}
              errorMessage={errors.description}
              error={touched.description && errors.description}
              required
            />
          </Fields>

          <GlobalBtn type="submit" mx="auto" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Add folder"}
          </GlobalBtn>
        </form>
      )}
    </GlobalModal>
  );
};

export default AddTrainingFolder;
