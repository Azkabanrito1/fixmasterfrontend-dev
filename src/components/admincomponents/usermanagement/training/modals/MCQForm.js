import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, Button, IconButton, Stack } from "@mui/material";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import {
  FormGroup,
  SectionHeading,
} from "../../../../globalcomponents/Utilities";
import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalTextArea from "../../../../globalcomponents/GlobalTextArea";
import {
  useCreateMcqQuestion,
  useGetMcqDetailsById,
} from "../../../../../hooks/useQueries/useAdmin";
import { BsTrash } from "react-icons/bs";
import { useGetCategories } from "../../../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import GlobalFullScreenLoader from "../../../../globalcomponents/GlobalFullScreenLoader";

const MCQForm = ({
  questionId,
  folderId,
  isOpen,
  closeModal,
  useCategory,
  useDuration,
}) => {
  const [options, setOptions] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  // =======================mutations =======================
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const { mutate: createMCQ, isLoading: isCreating } = useCreateMcqQuestion({
    folderId,
    onSuccess,
    onFailed,
  });

  // =======================data fetching =================
  const { data: mcqData } = useGetMcqDetailsById(questionId, {
    enabled: !!questionId,
  });
  const { data: categoryData } = useGetCategories();

  const onSubmit = () => {
    const payload = {
      question: values.question,
      folderId,
      weight: values.weight,
      duration: values.duration,
      category: values.category,
      options: values.options,
      correctOption: values.correctOpt,
    };

    createMCQ(payload);
  };

  useEffect(() => {
    if (mcqData?.data) {
      setOptions(mcqData?.data?.options?.map((_, index) => `option-${index}`));
      setFieldValue("question", mcqData?.data?.question);
      setFieldValue(
        "options",
        mcqData?.data?.options?.map((data) => data.option)
      );
      setFieldValue(
        "correctOpt",
        mcqData?.data?.options?.filter((opt) => opt.isCorrectOption)[0]?.option
      );
    }
  }, [mcqData]);

  // =========================actions =============================
  const { handleChange, values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      question: "",
      options: [],
      correctOpt: "",
      weight: 1,
      category: 0,
    },
    onSubmit,
  });

  const addOption = () =>
    setOptions((prev) => [...prev, `option-${options.length}`]);

  const removeOption = (id) =>
    setOptions((prev) => prev.filter((_, index) => index !== id));

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading={!!questionId ? "Edit Question" : "Add New Question"}
        closeModal={closeModal}
      />

      <form onSubmit={handleSubmit}>
        <SectionHeading>Question Settings</SectionHeading>
        <GlobalTextArea
          labelText="Question"
          handleChange={handleChange}
          inputName={"question"}
          inputValue={values.question}
          className="mb-4"
          required
        />

        <FormGroup columns={2} className="mb-4">
          <GlobalInput
            labelText="Question Weight"
            inputType="number"
            descriptionText="To distinguish if questions have different weights"
            inputName="weight"
            inputValue={values.weight}
            handleChange={handleChange}
            required
          />

          {useDuration && (
            <GlobalInput
              labelText="Question Duration (minutes)"
              inputType="number"
              descriptionText="Specifically for interview questions"
              inputName="duration"
              inputValue={values.duration}
              handleChange={handleChange}
              required
            />
          )}
        </FormGroup>

        {!useDuration && (
          <>
            <SectionHeading>Options</SectionHeading>
            <Stack spacing={3} justifyItems={"center"} className="mb-4">
              {options.map((opt, index) => (
                <Stack
                  spacing={2}
                  direction={"row"}
                  justifyItems={"space-between"}
                >
                  <Box flex={1}>
                    <GlobalInput
                      labelText={`Option ${index + 1}`}
                      key={index}
                      inputName={opt}
                      inputValue={values.options[index]}
                      handleChange={(e) => {
                        const newOptions = values.options;
                        newOptions[index] = e.target.value;
                        setFieldValue("options", newOptions);
                      }}
                      required
                    />
                  </Box>
                  <IconButton onClick={() => removeOption(index)}>
                    <BsTrash color="var(--clr-primary)" />
                  </IconButton>
                </Stack>
              ))}
              <Button
                className="mx-auto"
                sx={{
                  bgcolor: "#4d4d4d",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#444",
                  },
                }}
                onClick={addOption}
              >
                Add New Option
              </Button>
            </Stack>
            <SectionHeading>Correct Option</SectionHeading>
            <FormGroup columns={2} className="mb-4">
              <GlobalSelect
                options={values.options.map((opt, index) => ({
                  id: index,
                  name: opt,
                }))}
                defaultOption={"Select Correct Option"}
                labelText={"Select Correct Option"}
                valueType={"string"}
                selectName={"correctOpt"}
                selectValue={values.correctOpt}
                handleChange={handleChange}
                required
              />
            </FormGroup>
          </>
        )}

        <GlobalBtn mx="auto" type="submit">
          Add Question
        </GlobalBtn>
      </form>

      <GlobalFullScreenLoader open={isCreating} />
    </GlobalModal>
  );
};

export default MCQForm;
