import AddBtn from "../../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import SingleTopic from "../../../../components/admincomponents/onboardingrequirements/SingleTopic";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  useCreateMsgorDec,
  useDeleteMsgorDec,
  useGetCollaboratorMsgorDec,
  useUpdateMsgorDec,
} from "../../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { SectionHeading } from "../../../../components/globalcomponents/Utilities";
import VideoSettings from "../../../../components/admincomponents/onboardingrequirements/VideoSettings";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import ConfirmDeleteModal from "../../../../components/globalcomponents/modals/ConfirmDeleteModal";
import AddThankYouMessage from "../../../../components/admincomponents/onboardingrequirements/modal/AddThankYouMessage";
import { Container } from "./VideoHome";
import SingleThankYouMessage from "../../../../components/admincomponents/onboardingrequirements/SingleThankYouMessage";

const ThankYou = ({ collaborator }) => {
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [showEditMessage, setShowEditMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [message, setMessage] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //---------------------------------------------------------------mutates & mutates fnc-------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddMessage(false);
    setShowEditMessage(false);
    setShowDeleteMessage(false);
  };

  function onFailed(response) {
    enqueueSnackbar(response.message, { variant: "error" });
  }

  //-----------------------------------------------------data fetching-----------------------------------------
  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() === collaborator.split(" ")[0].toLowerCase()
  )?.[0];

  const { data: thankYouMessage, isLoading } = useGetCollaboratorMsgorDec({
    category: "message",
    collaboratorId: collaboratorData?.id,
    type: "thank_you",
    options: {
      enabled: !!collaboratorData?.id,
    },
  });

  const { mutate: createThankYouMessage, isLoading: isCreating } =
    useCreateMsgorDec({
      onSuccess,
      onFailed,
      collaboratorId: collaboratorData?.id,
      category: "message",
      type: "thank_you",
    });

  const { mutate: updateThankYouMessage, isLoading: isEditing } =
    useUpdateMsgorDec({
      onSuccess,
      onFailed,
      collaboratorId: collaboratorData?.id,
      category: "message",
      type: "thank_you",
    });

  const { mutate: deleteThankYouMessage, isLoading: isDeleting } =
    useDeleteMsgorDec({
      onSuccess,
      onFailed,
      collaboratorId: collaboratorData?.id,
      category: "message",
      type: "thank_you",
    });

  //----------------------------------modal controllers------------------------------------
  const getActiveMessage = function (id) {
    return thankYouMessage?.contents?.filter((item) => item.id === id);
  };
  const addMessageHandler = () => {
    setShowAddMessage(true);
  };
  const editMessageHandler = (id) => {
    const active = getActiveMessage(id);
    setMessage(active[0]);
    setShowEditMessage(true);
  };
  const deleteMessageHandler = (id) => {
    const active = getActiveMessage(id);
    setMessage(active[0]);
    setShowDeleteMessage(true);
  };

  const addMessage = (initPayload) => {
    const payload = {
      collaboratorId: collaboratorData?.id,
      content: initPayload.message,
      category: "message",
      type: "thank_you",
    };
    createThankYouMessage(payload);
  };

  const editMessage = (initPayload) => {
    const payload = {
      recordId: initPayload.id,
      content: initPayload.content,
      category: "message",
      type: "thank_you",
    };
    updateThankYouMessage(payload);
  };

  return (
    <div style={{ marginBottom: "-1rem" }}>
      <Collapsible
        trigger={
          <SectionHeading
            className="w-100 d-flex justify-content-between"
            style={{
              marginTop: "-2rem",
            }}
          >
            Thank You Message
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        <GlobalBallBeat loading={isLoading} />
        <Stack spacing={3} style={{ marginBottom: "3rem" }}>
          <Stack spacing={1}>
            {thankYouMessage?.contents?.map((message, index) => (
              <SingleThankYouMessage
                key={message?.id}
                messages={message}
                index={index}
                editMessage={editMessageHandler}
                deleteMessage={deleteMessageHandler}
              />
            ))}
          </Stack>
          <div style={{ marginBottom: "-2rem", marginTop: 0 }}>
            <AddBtn
              text="Add Message"
              id="add-thank-you-message"
              action={addMessageHandler}
            />
          </div>
        </Stack>
      </Collapsible>

      {showAddMessage && (
        <AddThankYouMessage
          isOpen={showAddMessage}
          closeModal={() => setShowAddMessage(false)}
          addMessages={addMessage}
          isCreating={isCreating}
        />
      )}
      {showEditMessage && (
        <AddThankYouMessage
          isOpen={showEditMessage}
          closeModal={() => setShowEditMessage(false)}
          initMessage={message}
          editMessage={editMessage}
          isCreating={isEditing}
        />
      )}

      {showDeleteMessage && (
        <ConfirmDeleteModal
          actionText={"Delete"}
          open={showDeleteMessage}
          close={() => setShowDeleteMessage(false)}
          onDelete={() => deleteThankYouMessage({ recordId: message.id })}
          labelText={"Delete Message?"}
          pText={"Are you sure you want to delete this Thank You Message?"}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default ThankYou;
