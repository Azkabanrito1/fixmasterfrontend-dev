import { PreboardingContainer } from "../../globalcomponents/Utilities";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useGetUserProfile } from "../../../hooks/useQueries/useIdentity";
import useLoginDetails from "../../../hooks/useLoginDetails";
import { useGetUserMsgorDec } from "../../../hooks/useQueries/useAdmin";
import {
  useAcceptOnboardingDecOrMsg,
  useGetStageId,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";

const Welcome = () => {
  const { data: stageData } = useGetStageId();

  const { data: userData } = useGetUserProfile();
  const { enqueueSnackbar } = useSnackbar();
  const stageName = stageData?.data?.stageName;

  const welcomeType = stageName?.includes("onboarding")
    ? "onboarding"
    : "preboarding";

  const { data: msgData } = useGetUserMsgorDec({
    category: "message",
    type: welcomeType.toLowerCase(),
    options: {
      enabled: !!stageName,
    },
  });

  const onAcceptSuccess = async () => {
    enqueueSnackbar("Welcome to the FixMaster team", {
      variant: "success",
    });
  };

  const onAcceptError = (error) => {
    enqueueSnackbar(error.data.message, {
      variant: "error",
    });
  };

  const { mutate: acceptDeclaration } = useAcceptOnboardingDecOrMsg({
    onSuccess: onAcceptSuccess,
    onFailed: onAcceptError,
    category: "message",
  });

  const fName = userData?.user?.firstName;

  const paragraphs = msgData?.contents?.map((statement) => (
    <p key={statement.id}>{statement.content}</p>
  ));

  return (
    <>
      <PreboardingContainer>
        <div>
          <h1>Welcome {fName},</h1>
          {paragraphs}
          <GlobalBtn
            onClick={acceptDeclaration}
            mx="auto"
            height="auto"
            size="large"
            py="16px"
            my="40px"
          >
            Get Started
          </GlobalBtn>
        </div>
      </PreboardingContainer>
    </>
  );
};

export default Welcome;
