import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import { Fields, FormGroup } from "../../../../globalcomponents/Utilities";
import {
  useGetRootCategories,
  useManageFolder,
  useUpdateFolder,
} from "../../../../../hooks/useQueries/useAdmin";
import GlobalTextArea from "../../../../globalcomponents/GlobalTextArea";
import { useLocation } from "react-router-dom";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";

const EditTrainingFolder = ({
  isOpen,
  closeModal,
  activeFolder,
  testTypeId,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  }

  function onFailed(response) {
    enqueueSnackbar(response.message || response.title, { variant: "error" });
  }

  const { mutate: updateFolder } = useUpdateFolder({
    onSuccess,
    onFailed,
    testTypeId,
  });
  const { mutate: manageFolder } = useManageFolder({
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

  const { data: rootCategories } = useGetRootCategories();

  const onSubmit = () => {
    const payload = {
      folderId: activeFolder.folderId,
      folderName: values.name,
      timeAllocated:
        mcqType === "aptitude" || mcqType === "interview"
          ? null
          : values.timeAllocated,
      passMark:
        mcqType === "aptitude" || mcqType === "interview"
          ? null
          : values.passMark,
      maxAttemptAllowed:
        mcqType === "aptitude" || mcqType === "interview"
          ? null
          : values.maxAttemptAllowed,
      promptTime:
        mcqType === "aptitude" || mcqType === "interview"
          ? null
          : values.promptTime,
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

    updateFolder(payload);
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: activeFolder.folderName,
        timeAllocated: activeFolder.timeAllocated,
        passMark: activeFolder.passMark,
        maxAttemptAllowed: activeFolder.maxAttemptAllowed,
        promptTime: activeFolder.promptTime,
        questionPerExam: activeFolder.questionPerExam,
        videoRecordingTime: activeFolder.videoRecordingTime,
        description: activeFolder.folderDescription,
        category: activeFolder.category,
      },
      onSubmit,
    });

  const categoryId = rootCategories?.data?.find(
    (category) => category.name === values.category
  );

  const toggleActivate = () => {
    const payload = {
      folderId: activeFolder?.folderId,
      action:
        activeFolder?.status?.toLowerCase() === "active"
          ? "deactivate"
          : "activate",
    };
    manageFolder(payload);
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader closeModal={closeModal}>
        <div className="d-flex d-column d-md-row justify-content-between align-items-center">
          <h2
            className="text-capitalize"
            style={{ color: "var(--clr-primary)" }}
          >
            Edit Training Folder
          </h2>
          <GlobalBtn onClick={toggleActivate} className="w-auto" px="15px">
            {activeFolder?.status === "Active" ? "Deactivate" : "Activate"}
          </GlobalBtn>
        </div>
      </AltModalHeader>

      {mcqType === "aptitude" || mcqType === "interview" ? (
        <form onSubmit={handleSubmit}>
          <Fields>
            <FormGroup columns="2">
              <GlobalInput
                labelText="Folder Name"
                inputName="name"
                inputValue={values.name}
                error={touched.name && errors.name}
                errorMessage={errors.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                required
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
              inputName="description"
              handleBlur={handleBlur}
              handleChange={handleChange}
              inputValue={values.description}
              errorMessage={errors.description}
              error={touched.description && errors.description}
              required
            />
          </Fields>

          <GlobalBtn type="submit" mx="auto">
            Update
          </GlobalBtn>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <Fields>
            <FormGroup columns="2">
              <GlobalInput
                labelText="Folder Name"
                inputName="name"
                inputValue={values.name}
                error={touched.name && errors.name}
                errorMessage={errors.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
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
              descriptionText="describe the content of this folder "
              inputName="description"
              handleBlur={handleBlur}
              handleChange={handleChange}
              inputValue={values.description}
              errorMessage={errors.description}
              error={touched.description && errors.description}
              required
            />
          </Fields>

          <GlobalBtn type="submit" mx="auto">
            Update
          </GlobalBtn>
        </form>
      )}
    </GlobalModal>
  );
};

export default EditTrainingFolder;
