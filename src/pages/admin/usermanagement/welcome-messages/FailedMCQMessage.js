import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import {
  useCreateMsgorDec,
  useDeleteMsgorDec,
  useGetCollaboratorMsgorDec,
  useUpdateMsgorDec,
} from "../../../../hooks/useQueries/useAdmin";
import SingleDeclaration from "../../../../components/admincomponents/usermanagement/declarations/SingleDeclaration";
import ConfirmDeleteModal from "../../../../components/globalcomponents/modals/ConfirmDeleteModal";
import AddWelcomeMessage from "../../../../components/admincomponents/usermanagement/modals/AddWelcomeMessage";
import { useState } from "react";
import { useSnackbar } from "notistack";
import AddBtn from "../../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";

const FailedMCQMessage = ({ collaborator, messageType }) => {
  const [showAddMessage, setShowAddMessage] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState({});
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // =======================fetching data =======================
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

  // ========================= mutations =========================
  function onSuccess(response) {
    setShowAddMessage(false);
    setShowDeleteMessage(false);
    setMessageToEdit({});
    enqueueSnackbar(response.message, { variant: "success" });
  }
  function onFailed(response) {
    enqueueSnackbar(response.message, { variant: "error" });
  }

  const { mutate: createMessage } = useCreateMsgorDec({
    onSuccess,
    onFailed,
    collaboratorId: collaboratorData?.id,
    category: "message",
    type: messageType.toLowerCase(),
  });

  const { mutate: updateMessage } = useUpdateMsgorDec({
    onSuccess,
    onFailed,
    collaboratorId: collaboratorData?.id,
    category: "message",
    type: messageType.toLowerCase(),
  });

  const { mutate: deleteMessage } = useDeleteMsgorDec({
    onSuccess,
    onFailed,
    collaboratorId: collaboratorData?.id,
    category: "message",
    type: messageType.toLowerCase(),
  });

  // ========================= actions =========================
  const openAddMessage = () => {
    setShowAddMessage(true);
  };

  const openEditMessage = (id) => {
    const activeMessage = msgData?.contents?.filter((msg) => msg.id === id);
    setMessageToEdit(activeMessage[0]);
    setShowAddMessage(true);
  };

  const openDeleteMessage = (id) => {
    const activeMessage = msgData?.contents?.filter((msg) => msg.id === id);
    setMessageToEdit(activeMessage[0]);
    setShowDeleteMessage(true);
  };

  const addMessage = (messageObj) => {
    const payload = {
      collaboratorId: collaboratorData?.id,
      content: messageObj.message,
      category: "message",
      type: messageType.toLowerCase(),
    };

    createMessage(payload);
  };

  const editMessage = (messageObj) => {
    const payload = {
      collaboratorId: collaboratorData?.id,
      recordId: messageObj.id,
      content: messageObj.message,
      category: "message",
      type: messageType.toLowerCase(),
    };

    updateMessage(payload);
  };

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>{messageType} Messages</PageHeading>
      </div>

      <Stack spacing={3}>
        <Stack spacing={1}>
          {msgData?.contents?.map((dec, index) => (
            <SingleDeclaration
              key={dec.id}
              index={index}
              declaration={dec}
              deleteDeclaration={openDeleteMessage}
              editDeclaration={openEditMessage}
            />
          ))}
        </Stack>

        <AddBtn text="Add Message" id="add-Message" action={openAddMessage} />
      </Stack>

      {showAddMessage && (
        <AddWelcomeMessage
          isOpen={showAddMessage}
          closeModal={() => setShowAddMessage(false)}
          addMessage={addMessage}
          initMessage={messageToEdit}
          editMessage={editMessage}
        />
      )}

      {showDeleteMessage && (
        <ConfirmDeleteModal
          actionText={"Delete"}
          open={showDeleteMessage}
          close={() => setShowDeleteMessage(false)}
          onDelete={() => deleteMessage({ recordId: messageToEdit.id })}
          labelText={"Delete Message?"}
          pText={"Are you sure you want to delete this Message?"}
        />
      )}
    </Stack>
  );
};

export default FailedMCQMessage;
