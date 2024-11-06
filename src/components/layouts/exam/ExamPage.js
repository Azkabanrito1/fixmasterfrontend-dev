import { useEffect, useState } from "react";
import styled from "styled-components";
import ExamSideBar from "./ExamSideBar";
import ExamResult from "./ExamResult";
import { useParams } from "react-router-dom";
import {
  useGetMcq,
  useGetMcqQuestions,
  useGetStageId,
  useGetTestTypeByStageId,
  useGetTrainingFolder,
  useSubmitMCQAnswer,
} from "../../../hooks/useQueries/useOnboarding";
import { Container } from "../../globalcomponents/Utilities";
import Questions from "./Questions";
import Header from "../dashboard/CollaboratorDashboardHeader";
import { useSnackbar } from "notistack";
import { generateTimerOffset } from "../../../utils/utilityFxns";
import useWebRTC from "../../../hooks/useWebRTC";
import { useTimer } from "react-timer-hook";
import {
  useGetCollaboratorRoles,
  useUploadVideo,
} from "../../../hooks/useQueries/useIdentity";
import WebcamError from "../../globalcomponents/modals/WebcamError";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import { useGetAllCollabTrainingMCQ } from "../../../hooks/useQueries/useAdmin";

const ExamPage = ({ collaborator, examType }) => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState({});
  const [showSideBar, setShowSideBar] = useState(false);
  const [allAnswers, setAllAnswers] = useState({});
  const [examTime, setExamTime] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [result, setResult] = useState(null);
  const [uploadResponse, setUploadResponse] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const closeModal = () => {
    setIsResultModalOpen(false);
  };

  // =======================fetching======================
  const { data: onboardingData } = useGetStageId({
    refetchOnWindowRefocus: false,
  });
  const stageId = onboardingData?.data?.stageId;
  const { folderId: initId } = useParams();
  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() === collaborator?.split(" ")[0].toLowerCase()
  )?.[0];

  const { data: stagesData, isLoading: loadingStagesData } =
    useGetAllCollabTrainingMCQ(collaboratorData?.id, {
      enabled: !initId && !!collaboratorData?.id,
      refetchOnWindowFocus: false,
    });
  const mcqId = stagesData?.data?.filter(
    (el) => el.trainingType.toLowerCase() === "aptitude (mcq)"
  )?.[0].id;
  const onboardingId = stagesData?.data?.filter(
    (el) => el.trainingType.toLowerCase() === "onboarding training"
  )?.[0].id;
  const activeId = stagesData?.data?.filter(
    (el) => el.trainingType.toLowerCase() === "active training"
  )?.[0].id;
  const testtypeid =
    examType?.toLowerCase() === "general" ? mcqId : onboardingId;

  const { data: folderData, isLoading: loadingFolderData } =
    useGetTrainingFolder(testtypeid, {
      enabled: examType != "general" && !initId && !!testtypeid,
      refetchOnWindowFocus: false,
    });

  const folderId = folderData?.data[0]?.folderId || initId;

  // const videoRecordingTime = folderData?.data[0]?.videoRecordingTime;
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordingError,
    errorMessage,
  } = useWebRTC({
    testType: "mcq",
  });

  // disable loading of questions until camera launches

  // general mcq
  const {
    data: mcqQuestions,
    isLoading: loadingQuestion,
    refetch: getMCQs,
  } = useGetMcqQuestions(testtypeid, {
    // enabled: examType === "general",
    enabled:
      examType === "general" && testtypeid
        ? !!testtypeid && isRecording
        : false,
    // enabled: false,
    refetchOnWindowFocus: false,
  });

  // onboarding
  const {
    data: mcqFolders,
    isLoading: loadingFolder,
    refetch: getFolders,
  } = useGetMcq(initId || folderId, {
    enabled:
      examType !== "general" && initId
        ? !!initId && isRecording
        : !!folderId && isRecording,
    // enabled: false,
    refetchOnWindowFocus: false,
  });
  const questionsData = examType === "general" ? mcqQuestions : mcqFolders;

  // =========================mutations=========================
  const onSuccess = (response) => {
    setResult(response?.data);
    setIsResultModalOpen(true);
    setIsSubmitting(false);
  };
  const onUploadSuccess = (response) => {
    setUploadResponse(response?.data);
    if (isSubmitting) {
      submitAnswers();
    }
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: submitExam } = useSubmitMCQAnswer(onSuccess, onFailure);
  const {
    mutate: uploadVideo,
    mutateAsync: asyncUploadVideo,
    isLoading: isUploading,
  } = useUploadVideo(onUploadSuccess, onFailure, "video");

  // ========================side effects=====================
  // start camera on mount of the component
  useEffect(() => {
    if (!!folderId || !!initId || !!testtypeid) {
      startRecording(getMCQs || getFolders);
    }
  }, [folderId, testtypeid, initId, getMCQs || getFolders]);

  // start timer for recording session
  useEffect(() => {
    if (isRecording) {
      const recordingTime = generateTimerOffset(30); //FOR CHANGING RECORDING TIME
      restart(recordingTime);
    }
  }, [isRecording]);

  useEffect(() => {
    if (questionsData?.data) {
      setExamTime(questionsData.data?.timeAllocated);

      const questionsArr = questionsData?.data?.listTrainingTestQuestions?.map(
        (question) => ({
          question: question.question,
          options: question.listOfOptions,
        })
      );

      setQuestions(questionsArr);
    }
  }, [questionsData?.data]);

  useEffect(() => {
    if (questions?.length > 0) {
      setActiveQuestion({
        index: 0,
        question: questions[0],
        total: questions.length,
      });
    }
  }, [questions]);

  // useEffect(() => {
  //   const optionsArr = Object.keys(allAnswers).map((answer) => ({
  //     optionId: allAnswers[answer].optionId,
  //     answer: allAnswers[answer].optionData,
  //   }));

  //   if (isSubmitting && !!uploadResponse.url) {
  //     const payload = {
  //       folderId: initId || folderId,
  //       responses: optionsArr,
  //       url: uploadResponse.url,
  //     };

  //     submitExam(payload);
  //   }
  // }, [isSubmitting, uploadResponse.url, allAnswers]);

  async function stopRecordCallBack(file) {
    const docs = new FormData();
    docs.append("file", file);

    uploadVideo(docs);
  }

  const { restart } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => {
      if (isRecording) {
        stopRecording(stopRecordCallBack);
      }
    },
  });

  // =======================data manipulation=======================
  const controlQuestion = (i) => {
    setActiveQuestion({
      ...activeQuestion,
      index: i,
      question: questions[i],
    });
  };

  const updateAnswers = (e, index, optionData) => {
    // answer object is name to value
    const answer = {
      [e.target.name]: { optionId: e.target.value, optionData },
    };

    setAllAnswers((ans) => ({ ...ans, ...answer }));

    updateAnswered(index);
  };

  const updateAnswered = (index) => {
    setAnswered((answered) => [...answered, index]);
  };

  const submitAnswers = async () => {
    setIsSubmitting(true);
    const optionsArr = Object.keys(allAnswers).map((answer) => ({
      optionId: allAnswers[answer].optionId,
      answer: allAnswers[answer].optionData,
    }));

    const payload = {
      folderId: examType === "general" ? null : parseInt(folderId),
      collabId: examType === "general" ? testtypeid : null,
      responses: optionsArr,
      url: uploadResponse.url,
    };

    if (isRecording) {
      stopRecording(async (file) => {
        const docs = new FormData();
        docs.append("file", file);
        const response = await asyncUploadVideo(docs);
        submitExam({ ...payload, url: response.data.data.url });
      });
    } else if (!isRecording && !!uploadResponse.url) {
      submitExam(payload);
    } else {
      console.error("No file to upload");
      submitExam(payload);
    }
  };

  const timeValue = examTime * 60;
  const timeStamp = examTime ? generateTimerOffset(examTime * 60) : null;
  let score = result?.percentScore?.slice(
    0,
    result?.percentScore?.indexOf("%")
  );
  score = parseInt(score).toFixed(2);
  const results = result?.response;
  const loading = loadingStagesData || loadingQuestion || loadingFolder;

  return (
    <>
      <Header setShowSideBar={setShowSideBar} />
      <ExamContainer>
        <Questions
          controlQuestion={controlQuestion}
          questions={questions}
          activeQuestion={activeQuestion}
          handleChange={updateAnswers}
          allAnswers={allAnswers}
          isLoading={loading}
        />
        <ExamSideBar
          activeQuestion={activeQuestion.index}
          answered={answered}
          questions={questions}
          promptTime={questionsData?.data?.promptTime}
          controlQuestion={controlQuestion}
          submitAnswer={submitAnswers}
          timeStamp={timeStamp}
          timeValue={timeValue}
          isLoading={loading}
          showSideBar={showSideBar}
          folderId={folderId}
          initId={initId}
        />
      </ExamContainer>

      {isResultModalOpen && (
        <ExamResult
          isOpen={isResultModalOpen}
          closeModal={closeModal}
          score={score}
          results={results}
          collaboratorData={collaboratorData}
        />
      )}

      {recordingError && (
        <WebcamError isOpen={recordingError} errorMessage={errorMessage} />
      )}

      <GlobalFullScreenLoader open={isSubmitting} />
    </>
  );
};

export default ExamPage;

const ExamContainer = styled(Container)`
  display: flex;
  height: calc(100vh - 90px);
  /* max-height: 110vh; */

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    height: auto;
    padding-top: 3px;
  }
`;
