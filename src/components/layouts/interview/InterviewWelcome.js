import styled from "styled-components";
import { PreboardingContainer } from "../../globalcomponents/Utilities";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import useLoginDetails from "../../../hooks/useLoginDetails";
import useInterviewRouter from "../../../hooks/useInterviewRouter";
import { useGetUserProfile } from "../../../hooks/useQueries/useIdentity";

const InterviewStarted = () => {
  const { role } = useLoginDetails();
  const router = useInterviewRouter();
  const { data: userData } = useGetUserProfile();

  const handleClick = () => {
    router(role);
  };

  return (
    <>
      <PreboardingContainer className="bg-light">
        <div>
          <h1>Welcome {userData?.user?.firstName}</h1>

          <p>
            This interview is planned for a duration of 30 minutes. Please be
            aware that the session will automatically conclude once the alloted
            time has elapsed.
          </p>
          <p>
            Please ensure that you are dressed appropriately and have a form of
            identification visible.
          </p>
          <p>You will be required to allow the camera recording</p>
        </div>
        <GlobalBtn
          onClick={handleClick}
          mx="auto"
          height="auto"
          size="large"
          py="16px"
          my="40px"
        >
          Get Started
        </GlobalBtn>
      </PreboardingContainer>
    </>
  );
};

export default InterviewStarted;
