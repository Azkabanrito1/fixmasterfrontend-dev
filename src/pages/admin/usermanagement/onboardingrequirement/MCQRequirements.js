import {
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import {
  useGetMcqCollaboratorsSettingbycollab,
  useUpdateMcqTrainingGlobalSettings,
} from "../../../../hooks/useQueries/useAdmin";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import GlobalToggleSwitch from "../../../../components/globalcomponents/GlobalToggleSwitch";
import {
  useGetMcqFlagStatus,
  useUpdateMcqFlagStatus,
} from "../../../../hooks/useQueries/useAdmin";
import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";

const MCQRequirements = ({ collaborator, trainingType }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: flagStatus, isLoading } = useGetMcqFlagStatus("technician");
  const [mcqStatus, setMcqStatus] = useState("");
  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() ===
      (collaborator === "qamaster" ? "qa" : collaborator)
  )?.[0];

  // Set the mcqStatus when flagStatus is loaded
  useEffect(() => {
    if (!isLoading && flagStatus?.data?.length > 0) {
      const status = flagStatus.data[0]?.flag === "Skip mcq" ? true : false;
      setMcqStatus(status);
    }
  }, [flagStatus, isLoading]);

  const handleMcqToggle = () => {
    const newFlag = !mcqStatus;
    setMcqStatus(newFlag);
    const payload = {
      category: "Technician",
      newFlag,
    };
    updateStatus(payload);
  };
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
    setMcqStatus(!mcqStatus);
  };
  const { mutate: updateStatus, isLoading: isApproving } =
    useUpdateMcqFlagStatus(onSuccess, onFailed);
  const { mutate: updateMcqTrainingGlobalSettings } =
    useUpdateMcqTrainingGlobalSettings(onSuccess, onFailed);

  const { data: getMcqCollaboratorsSettingbycollab } =
    useGetMcqCollaboratorsSettingbycollab(collaboratorData?.id, trainingType);

  const mcqCollaboratorsSettingbycollab =
    getMcqCollaboratorsSettingbycollab?.data[0];

  // ========================actions =================
  const onSubmit = () => {
    const payload = {
      collabId: collaboratorData?.id,
      trainingType: trainingType,
      examTimeAllocated: values.examTimeAllocated,
      maxDaysToComplete: values.maxDaysToComplete,
      passMark: values.passMark,
      numberOfQuestionsPerExam: values.numberOfQuestionsPerExam,
      maxAttemptAllowed: values.maxAttemptAllowed,
      promptTime: values.promptTime,
      videoRecording: 0,
    };
    updateMcqTrainingGlobalSettings(payload);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      numberOfQuestionsPerExam: 0,
      passMark: 0,
      examTimeAllocated: 0,
      maxAttemptAllowed: 0,
      maxDaysToComplete: 0,
      promptTime: 0,
    },
    onSubmit,
  });

  useEffect(() => {
    if (mcqCollaboratorsSettingbycollab?.id) {
      setFieldValue(
        "examTimeAllocated",
        mcqCollaboratorsSettingbycollab.examTimeAllocated
      );
      setFieldValue(
        "maxAttemptAllowed",
        mcqCollaboratorsSettingbycollab.maxAttemptsAllowed
      );
      setFieldValue(
        "maxDaysToComplete",
        mcqCollaboratorsSettingbycollab.maxDaysToComplete
      );
      setFieldValue("passMark", mcqCollaboratorsSettingbycollab.passMark);
      setFieldValue("promptTime", mcqCollaboratorsSettingbycollab.promptTime);
      setFieldValue(
        "numberOfQuestionsPerExam",
        mcqCollaboratorsSettingbycollab.questionsPerExam
      );
    }
  }, [mcqCollaboratorsSettingbycollab?.id]);

  return (
    <div
      style={{
        marginBottom: "-1rem",
        marginTop: `${trainingType === 3 ? "-3rem" : "-2rem"}`,
      }}
    >
      <Collapsible
        trigger={
          <SectionHeading className="w-100 d-flex justify-content-between">
            {trainingType === 1 || trainingType === 2 ? "MCQ" : "Interview"}{" "}
            Settings
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        {collaborator === "technician" && trainingType === 2 && (
          <p style={{ color: "#696f79", marginBottom: "2rem" }}>
            Disable this stage{" "}
            <GlobalToggleSwitch
              isChecked={mcqStatus}
              handleChange={handleMcqToggle}
            />
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Fields>
            <FormGroup columns={3} className="mb-3">
              {(trainingType === 2 || trainingType === 3) && (
                <>
                  <GlobalInput
                    labelText="Total No. of Questions"
                    inputName="numberOfQuestionsPerExam"
                    required
                    inputType="number"
                    min={0}
                    inputValue={values.numberOfQuestionsPerExam}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={
                      errors.numberOfQuestionsPerExam &&
                      touched.numberOfQuestionsPerExam
                    }
                    errorMessage={errors.numberOfQuestionsPerExam}
                  />
                  <GlobalInput
                    labelText="Total Time Allocated (mins)"
                    inputName="examTimeAllocated"
                    required
                    inputType="number"
                    min={0}
                    inputValue={values.examTimeAllocated}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={
                      errors.examTimeAllocated && touched.examTimeAllocated
                    }
                    errorMessage={errors.examTimeAllocated}
                  />
                  <GlobalInput
                    labelText="Warning Prompt Time"
                    inputName="promptTime"
                    required
                    inputType="number"
                    min={0}
                    inputValue={values.promptTime}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={errors.promptTime && touched.promptTime}
                    errorMessage={errors.promptTime}
                  />

                  {trainingType !== 3 && (
                    <>
                      <GlobalInput
                        labelText="Cut Off Mark (%)"
                        inputName="passMark"
                        required
                        inputType="number"
                        min={0}
                        inputValue={values.passMark}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={errors.passMark && touched.passMark}
                        errorMessage={errors.passMark}
                      />
                      <GlobalInput
                        labelText="No. of Allowed Attempts"
                        inputName="maxAttemptAllowed"
                        required
                        inputType="number"
                        min={0}
                        inputValue={values.maxAttemptAllowed}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={
                          errors.maxAttemptAllowed && touched.maxAttemptAllowed
                        }
                        errorMessage={errors.maxAttemptAllowed}
                      />
                      <GlobalInput
                        labelText="Completion Deadline (days)"
                        inputName="maxDaysToComplete"
                        required
                        inputType="number"
                        min={0}
                        inputValue={values.maxDaysToComplete}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        error={
                          errors.maxDaysToComplete && touched.maxDaysToComplete
                        }
                        errorMessage={errors.maxDaysToComplete}
                      />
                    </>
                  )}
                </>
              )}
              {trainingType === 1 && (
                <>
                  <GlobalInput
                    labelText="Completion Deadline (days)"
                    inputName="maxDaysToComplete"
                    required
                    inputType="number"
                    min={0}
                    inputValue={values.maxDaysToComplete}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    error={
                      errors.maxDaysToComplete && touched.maxDaysToComplete
                    }
                    errorMessage={errors.maxDaysToComplete}
                  />
                </>
              )}
            </FormGroup>
          </Fields>

          <GlobalBtn
            mx="auto"
            type="submit"
            style={{
              marginBottom: "2rem",
            }}
          >
            Save
          </GlobalBtn>
        </form>
      </Collapsible>
    </div>
  );
};

export default MCQRequirements;
