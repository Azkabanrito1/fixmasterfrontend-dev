import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import useLogout from "../../../hooks/useLogout";
import useRouteToMaterials from "../../../hooks/useRouteToMaterials";
import useLoginDetails from "../../../hooks/useLoginDetails";
import { useSnackbar } from "notistack";
import { useGetCollaboratorMsgorDec } from "../../../hooks/useQueries/useAdmin";

const ExamResult = ({
  isOpen,
  closeModal,
  score,
  results,
  collaboratorData,
}) => {
  const returnToMaterials = useRouteToMaterials();
  const { role, onboarding } = useLoginDetails();
  const navigate = useNavigate();
  const logout = useLogout(() => navigate("/"));
  const { enqueueSnackbar } = useSnackbar();

  const usersWithOneMCQ = ["franchisee", "qa", "supplier"];

  const handleClick = () => {
    if (
      onboarding.stageId > 3 ||
      usersWithOneMCQ.includes(role.toLowerCase())
    ) {
      const message =
        results?.toLowerCase() === "exam passed"
          ? "You have passed this training. You can attempt another exam."
          : "Please go through the materials and try again.";
      enqueueSnackbar(message, { variant: "info" });
      returnToMaterials(role);
    } else {
      const message =
        results?.toLowerCase() === "exam passed"
          ? "You can sign in to continue your on-boarding process."
          : "Please check your email for further information.";
      enqueueSnackbar(message, { variant: "info" });
      logout();
    }
  };

  const { data: mcqPassedMessage, isLoading } = useGetCollaboratorMsgorDec({
    category: "message",
    collaboratorId: collaboratorData?.id,
    type: "mcq-passed",
    options: {
      enabled: !!collaboratorData?.id,
    },
  });

  const { data: mcqFailedMessage, isLoading: isFailing } =
    useGetCollaboratorMsgorDec({
      category: "message",
      collaboratorId: collaboratorData?.id,
      type: "mcq-failed",
      options: {
        enabled: !!collaboratorData?.id,
      },
    });

  const { data: mcqRetakeMessage, isLoading: isRetaking } =
    useGetCollaboratorMsgorDec({
      category: "message",
      collaboratorId: collaboratorData?.id,
      type: "mcq-retake",
      options: {
        enabled: !!collaboratorData?.id,
      },
    });

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      width="500px"
      shouldCloseOnOverlayClick={false}
    >
      <ResultContainer>
        <h3>Your Score: {score}%</h3>
        <h2
          className={
            results?.toLowerCase() === "exam passed"
              ? "text-success"
              : "text-danger"
          }
        >
          {results?.toLowerCase() === "exam passed"
            ? "Congratulations!"
            : "Better Luck Next Time!"}
        </h2>
        {collaboratorData ? (
          <p>
            {results?.toLowerCase() === "exam passed"
              ? mcqPassedMessage?.contents?.map((item) => (
                  <p>{item?.content}</p>
                ))
              : mcqFailedMessage?.contents?.map((failedMessage) =>
                  mcqRetakeMessage?.contents?.map((retakeMessage) => (
                    <>
                      <p>{failedMessage?.content}</p>
                      <p>{retakeMessage?.content}</p>
                    </>
                  ))
                )}
          </p>
        ) : (
          <p>
            {results?.toLowerCase() === "exam passed"
              ? `You have successfully passed your MCQ test. You are now one step closer to being a ${role}. You will be logged out. Please log back in to continue your application`
              : `Your score is below average. You will not be able to proceed to the next stage until you have passed this test. You are required to re-take this test until you have passed`}
          </p>
        )}
        <GlobalBtn onClick={handleClick}>
          {results?.toLowerCase() === "exam passed" ? "Proceed" : "Try Again"}
        </GlobalBtn>
      </ResultContainer>
    </GlobalModal>
  );
};

export default ExamResult;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-block: 1rem;

  h3 {
    color: var(--clr-primary);
    font-size: 1.8rem;
  }

  h2 {
    font-size: 2rem;

    &.passed {
      color: #37b34a;
    }

    &.failed {
      color: #e01b1b;
    }
  }

  div {
    color: #a1a1a1;
  }

  p {
    color: #242426;
    font-size: 20px;
    text-align: center;
  }
`;
