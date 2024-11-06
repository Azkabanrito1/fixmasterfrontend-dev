import React from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import { SuccessContainer } from "../../franchiseecomponents/modals/PreboardingSuccess";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";
import { useGetCollaboratorMsgorDec } from "../../../hooks/useQueries/useAdmin";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";

const FinishInterview = ({ isOpen, closeModal, collaborator }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const logout = useLogout(() => navigate("/"));

  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter((collab) => {
    return (
      collab.name.toLowerCase() === collaborator.split(" ")[0].toLowerCase()
    );
  })?.[0];

  const { data: thankYouMessage } = useGetCollaboratorMsgorDec({
    category: "message",
    collaboratorId: collaboratorData?.id,
    type: "thank_you",
    options: {
      enabled: !!collaboratorData?.id,
    },
  });

  const handleClick = () => {
    logout();
    enqueueSnackbar(
      "You will be contacted by a personnel shortly on how to proceed with application process"
    );
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width="500px">
      <SuccessContainer>
        <img src="/images/closeinterview.jpg" alt="urgent" />
        {thankYouMessage?.contents?.map((message) => {
          return <p>{message?.content}</p>;
        })}
        <GlobalBtn onClick={handleClick}>Close</GlobalBtn>
      </SuccessContainer>
    </GlobalModal>
  );
};

export default FinishInterview;
