import styled from "styled-components";
import { useEffect, useState } from "react";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import InterviewTimer from "../../globalcomponents/InterviewTimer";
import { useTimer } from "react-timer-hook";
import { useSnackbar } from "notistack";
import {
  useGetTrainingFolder,
  useGetTestTypeByStageId,
  useGetInterviewQuestion,
  useSubmitInterviewAnswers,
  useGetTrainingInterviewQuestions,
} from "../../../hooks/useQueries/useOnboarding";
import FinishInterview from "./FinishInterview";
import { useRef } from "react";
import { generateTimerOffset } from "../../../utils/utilityFxns";
import useWebRTC from "../../../hooks/useWebRTC";
import WebcamError from "../../globalcomponents/modals/WebcamError";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import {
  useGetCollaboratorRoles,
  useUploadVideo,
} from "../../../hooks/useQueries/useIdentity";
import { useGetAllCollabTrainingMCQ } from "../../../hooks/useQueries/useAdmin";

const Interview = ({ collaborator }) => {
  // ===============hooks ================
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const videoRef = useRef(null);

  const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));
  const onboarding = loginDetails?.onboarding;
  // const { stageId } = onboarding;

  // const { data: testTypeData } = useGetTestTypeByStageId(stageId, {
  //   refetchOnWindowFocus: false,
  // });
  // const testtypeid = testTypeData?.data?.id;
  // const { data: folderData } = useGetTrainingFolder(testtypeid, {
  //   enabled: !!testtypeid,
  //   refetchOnWindowFocus: false,
  // });
  // const folderId = folderData?.data?.[0]?.folderId;
  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() === collaborator?.split(" ")[0].toLowerCase()
  )?.[0];

  const { data: stagesData, isLoading: loadingStagesData } =
    useGetAllCollabTrainingMCQ(collaboratorData?.id, {
      enabled: !!collaboratorData?.id,
      refetchOnWindowFocus: false,
    });
  const testtypeid = stagesData?.data?.filter(
    (el) => el.trainingType.toLowerCase() === "interview questions"
  )?.[0].id;

  // const { data: folderData, isLoading: loadingFolderData } =
  //   useGetTrainingFolder(testtypeid, {
  //     enabled: !!testtypeid,
  //     refetchOnWindowFocus: false,
  //   });

  // const folderId = folderData?.data[0]?.folderId;

  // const { data: initialQuestion, refetch: getInitQuestion } =
  //   useGetInterviewQuestion(folderId, {
  //     enabled: false,
  //     refetchOnWindowFocus: false,
  //   });

  const { data: initialQuestion, refetch: getInitQuestion } =
    useGetTrainingInterviewQuestions(testtypeid, {
      enabled: false,
      refetchOnWindowFocus: false,
    });

  const promptTime = initialQuestion?.promptTime;

  const getQuestion = () => {
    if (testtypeid) {
      getInitQuestion();
      setHasStarted(true);
    }
  };

  const { startRecording, stopRecording, recordingError, errorMessage } =
    useWebRTC({
      testType: "interview",
      videoRef,
    });

  // ====================mutations================================
  const onSuccess = (response) => {
    if (response.statusCode === "000") {
      startRecording();
      setQuestion(response.question);
      setQuestionId(response.questionId);
      const questionTime = generateTimerOffset(response?.duration * 60);
      restart(questionTime);
    }
    if (response.statusCode === "003") {
      setHasStarted(false);
      setOpen(true);
    }
  };
  const onFailure = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const { mutate: submitAnswer, isLoading: isSubmitting } =
    useSubmitInterviewAnswers(onSuccess, onFailure);
  const { mutateAsync: uploadVideo, isLoading: isUploading } = useUploadVideo();

  async function stopRecordingCallback(blob) {
    pause();

    // upload to cloudinary
    const docs = new FormData();
    docs.append("file", blob);

    try {
      const response = await uploadVideo(docs);
      submitAnswer({
        questionId,
        answer: response.data.data.url,
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }

  const { minutes, seconds, restart, pause } = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: () => stopRecording(stopRecordingCallback),
  });

  useEffect(() => {
    const formattedMinutes = parseInt(minutes?.toString(), 10);
    const warningTime = parseInt(promptTime?.toString(), 10);

    if (formattedMinutes === warningTime - 1) {
      enqueueSnackbar(
        `You have ${warningTime} ${
          warningTime === 1 ? "minute" : "minutes"
        } to complete the interview!`,
        {
          variant: "warning",
        }
      );
    }
  }, [minutes]);

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion?.question);
      setQuestionId(initialQuestion?.questionId);
      const questionTime = generateTimerOffset(initialQuestion?.duration * 60);
      restart(questionTime);
    }
  }, [initialQuestion]);

  return (
    <Container>
      <Container>
        <div className={`${hasStarted ? "interview-hidden" : "image"}`}>
          <img src="/images/interview2.jpg" alt="" />
        </div>
        <div className={`${hasStarted ? "image" : "interview-hidden"}`}>
          <video ref={videoRef} autoPlay muted />
        </div>
        {!hasStarted ? (
          <StartButton onClick={() => startRecording(getQuestion)}>
            Start
          </StartButton>
        ) : (
          <StartButton disabled>Ongoing</StartButton>
        )}
      </Container>
      {hasStarted && (
        <QuestionBar>
          <MessageContainer>
            <span className="messenger">FixMaster Bot(Host)</span>
            <Message>{question}</Message>
          </MessageContainer>
          <div>
            <InterviewTimer minutes={minutes} seconds={seconds} />
            <GlobalBtn
              py="1rem"
              px="1.5rem"
              mx="auto"
              width="max-content"
              onClick={() => stopRecording(stopRecordingCallback)}
            >
              Next Question
            </GlobalBtn>
          </div>
        </QuestionBar>
      )}

      {recordingError && (
        <WebcamError isOpen={recordingError} errorMessage={errorMessage} />
      )}

      <FinishInterview isOpen={open} collaborator={collaborator} />
      <GlobalFullScreenLoader open={isSubmitting || isUploading} />
    </Container>
  );
};

export default Interview;

const Container = styled.div`
  position: relative;

  .image {
    display: flex;
    justify-content: center;
    height: 65vh;
    height: 65dvh;
    height: 65svh;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StartButton = styled.button`
  appearance: none;
  position: absolute;
  display: grid;
  place-items: center;
  width: 150px;
  aspect-ratio: 1;
  border: 5px solid #fffef9;
  background-color: #f26222;
  border-radius: 50%;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
`;

const MessageContainer = styled.div`
  width: 50%;

  .messenger {
    margin-bottom: 0.8rem;
    font-size: 0.8rem;
    font-weight: 700;
  }
`;

const Message = styled.div`
  display: grid;
  place-items: center;
  padding: 0.8rem;
  border-radius: 20px;
  background-color: #dedede;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

const QuestionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35vh;
  height: 35dvh;
  height: 35svh;
  padding: 2em;
`;
