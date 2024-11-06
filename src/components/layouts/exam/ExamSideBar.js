import styled from "styled-components";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import ExamTimer from "../../globalcomponents/ExamTimer";
import { useTimer } from "react-timer-hook";
import { useEffect } from "react";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import ConfirmAcceptModal from "../../globalcomponents/modals/ConfirmAcceptModal";
import { useState } from "react";
import { useGetMcq } from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";

const ExamSideBar = ({
  questions,
  controlQuestion,
  activeQuestion,
  answered,
  submitAnswer,
  timeStamp,
  timeValue,
  isLoading,
  showSideBar,
  folderId,
  initId,
  promptTime,
}) => {
  const [openSubmitExam, setOpenSubmitExam] = useState(false);
  const { minutes, seconds, restart, pause, isRunning } = useTimer({
    expiryTimestamp: new Date(),
    onExpire: () => submitAnswer(),
    autoStart: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (timeStamp && !isRunning) restart(timeStamp);
  }, [timeStamp]);

  useEffect(() => {
    const formattedMinutes = parseInt(minutes?.toString(), 10);
    const warningTime = parseInt(promptTime?.toString(), 10);

    if (formattedMinutes === warningTime - 1) {
      enqueueSnackbar(
        `You have ${warningTime} ${
          warningTime === 1 ? "minute" : "minutes"
        } to complete the exam!`,
        {
          variant: "warning",
        }
      );
    }
  }, [minutes]);

  const buttonTemplate = questions?.map((question, index) => {
    return (
      <Number
        key={question + index}
        onClick={() => controlQuestion(index)}
        className={activeQuestion === index ? "active" : ""}
        isAnswered={answered.includes(index)}
      >
        {index + 1}
      </Number>
    );
  });

  return (
    <Side className={showSideBar ? "open" : "close"}>
      <GlobalBallBeat loading={isLoading} />

      {!!questions?.length && (
        <>
          <h1 style={{ fontSize: "16px" }}>Exam automatically ends in</h1>
          <ExamTimer
            timeValue={timeValue}
            minutes={minutes}
            seconds={seconds}
          />

          <div className="w-100">
            <QuestionNumbers>{buttonTemplate}</QuestionNumbers>
            <GlobalBtn
              width="60%"
              mx="auto"
              onClick={() => setOpenSubmitExam(true)}
            >
              Submit
            </GlobalBtn>
          </div>
        </>
      )}

      {openSubmitExam && (
        <ConfirmAcceptModal
          open={openSubmitExam}
          close={() => setOpenSubmitExam(false)}
          onDelete={() => {
            pause();
            submitAnswer();
            setOpenSubmitExam(false);
          }}
          labelText={"Submit Exam"}
          pText={"Are you sure you want to submit this exam?"}
          actionText={"Submit"}
        />
      )}
    </Side>
  );
};

export default ExamSideBar;

const Side = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 90px);
  width: 30vw;
  padding: 2rem;
  background-color: #fff;
  overflow-y: scroll;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const QuestionNumbers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45px, 50px));
  justify-content: center;
  gap: 24px 8px;
  width: 100%;
  margin-block: 2rem;
`;

const Number = styled.button`
  display: grid;
  place-items: center;
  width: 45px;
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  background-color: ${({ isAnswered }) =>
    isAnswered ? "rgb(242, 98, 34, 0.6)" : "#f6f6f6"};
  color: ${({ isAnswered }) => (isAnswered ? "#fff" : "#a2a2a2")};
  font-size: 18px;

  &.active {
    background-color: var(--clr-primary);
    color: #fff;
  }
`;
