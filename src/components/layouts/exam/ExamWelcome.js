import { useParams } from "react-router-dom";
import { PreboardingContainer } from "../../globalcomponents/Utilities";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useState } from "react";
import StartExamModal from "../../csecomponent/cse/modal/StartExamModal";
import {
  useGetCollaboratorRoles,
  useGetUserProfile,
} from "../../../hooks/useQueries/useIdentity";
import {
  useGetOnboardingWelcome,
  useGetPreboardingWelcome,
} from "../../../hooks/useQueries/useOnboarding";
import useLoginDetails from "../../../hooks/useLoginDetails";
import { useGetCollaboratorMsgorDec } from "../../../hooks/useQueries/useAdmin";

const ExamWelcome = ({ collaborator, messageType }) => {
  const [openModal, setOpenModal] = useState(false);
  const { data: userData } = useGetUserProfile();
  const { data: onboardingMessages } = useGetOnboardingWelcome();
  const { data: preboardingMessages } = useGetPreboardingWelcome();
  const { onboarding } = useLoginDetails();

  const { folderId } = useParams();

  const fName = userData?.user?.firstName;

  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter((collab) => {
    return (
      collab.name.toLowerCase() === collaborator.split(" ")[0].toLowerCase()
    );
  })?.[0];

  const { data: msgData } = useGetCollaboratorMsgorDec({
    category: "message",
    collaboratorId: collaboratorData?.id,
    type: messageType.toLowerCase(),
    options: {
      enabled: !!collaboratorData?.id,
    },
  });

  const welcome = msgData?.contents || [];

  const ModalClose = () => {
    setOpenModal(false);
  };

  const handleClick = function () {
    setOpenModal((prev) => !prev);
  };

  const paragraphs = welcome?.map((statement) => (
    <p key={statement.id}>{statement.content}</p>
  ));

  return (
    <>
      <PreboardingContainer>
        <div>
          <h1>Welcome {fName}, </h1>
          {paragraphs}
          <GlobalBtn
            onClick={handleClick}
            mx="auto"
            height="auto"
            size="large"
            py="16px"
            my="40px"
          >
            Next
          </GlobalBtn>
        </div>
      </PreboardingContainer>
      <StartExamModal
        isOpen={openModal}
        closeModal={ModalClose}
        folderId={folderId}
      />
    </>
  );
};

export default ExamWelcome;
