import { useState } from "react";
import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import SingleDeclaration from "../../../../components/admincomponents/usermanagement/declarations/SingleDeclaration";
import AddBtn from "../../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import ConfirmDeleteModal from "../../../../components/globalcomponents/modals/ConfirmDeleteModal";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import {
  useCreateMsgorDec,
  useDeleteMsgorDec,
  useGetCollaboratorMsgorDec,
  useUpdateMsgorDec,
} from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import AddDeclaration from "../../../../components/admincomponents/usermanagement/modals/AddDeclaration";

const CollaboratorDeclarationsLayout = ({ collaborator, stageName }) => {
  const [showAddDeclaration, setShowAddDeclaration] = useState(false);
  const [showDeleteDeclaration, setShowDeleteDeclaration] = useState(false);
  const [decToEdit, setDecToEdit] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  // =======================fetching data =======================
  const { data: rolesData } = useGetCollaboratorRoles();
  const collaboratorData = rolesData?.data?.filter(
    (collab) =>
      collab.name.toLowerCase() === collaborator.split(" ")[0].toLowerCase()
  )?.[0];

  const { data: decData } = useGetCollaboratorMsgorDec({
    category: "declaration",
    collaboratorId: collaboratorData?.id,
    type: stageName.toLowerCase(),
    options: {
      enabled: !!collaboratorData?.id,
    },
  });

  // ========================mutations========================
  function onSuccess(response) {
    setShowAddDeclaration(false);
    setShowDeleteDeclaration(false);
    setDecToEdit({});
    enqueueSnackbar(response.message, { variant: "success" });
  }
  function onFailed(response) {
    enqueueSnackbar(response.message, { variant: "error" });
  }

  const { mutate: createDeclaration } = useCreateMsgorDec({
    onSuccess,
    onFailed,
    collaboratorId: collaboratorData?.id,
    category: "declaration",
    type: stageName.toLowerCase(),
  });

  const { mutate: updateDeclaration } = useUpdateMsgorDec({
    onSuccess,
    onFailed,
    collaboratorId: collaboratorData?.id,
    category: "declaration",
    type: stageName.toLowerCase(),
  });

  const { mutate: deleteDeclaration } = useDeleteMsgorDec({
    onSuccess,
    onFailed,
    collaboratorId: collaboratorData?.id,
    category: "declaration",
    type: stageName.toLowerCase(),
  });

  // =========================actions =========================
  const openAddDeclaration = () => {
    setShowAddDeclaration(true);
  };

  const openEditDeclaration = (id) => {
    setDecToEdit(decData?.contents?.filter((dec) => dec.id === id)[0]);
    openAddDeclaration();
  };

  const openDeleteDeclaration = (id) => {
    setDecToEdit(decData?.contents?.filter((dec) => dec.id === id)?.[0]);
    setShowDeleteDeclaration(true);
  };

  const createDeclarationAction = (content) => {
    const payload = {
      collaboratorId: collaboratorData?.id,
      content,
      category: "declaration",
      type: stageName.toLowerCase(),
    };

    createDeclaration(payload);
  };

  const updateDeclarationAction = ({ content, id }) => {
    const payload = {
      recordId: id,
      content,
      category: "declaration",
      type: stageName.toLowerCase(),
    };

    updateDeclaration(payload);
  };

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>{stageName} Declarations</PageHeading>
      </div>

      <Stack spacing={3}>
        <Stack spacing={1}>
          {decData?.contents?.map((dec, index) => (
            <SingleDeclaration
              key={dec.id}
              index={index}
              declaration={dec}
              editDeclaration={openEditDeclaration}
              deleteDeclaration={openDeleteDeclaration}
            />
          ))}
        </Stack>

        <AddBtn
          text="Add Declaration"
          id="add-declaration"
          action={openAddDeclaration}
        />
      </Stack>

      {showAddDeclaration && (
        <AddDeclaration
          isOpen={showAddDeclaration}
          initDeclaration={decToEdit}
          closeModal={() => setShowAddDeclaration(false)}
          addDeclaration={createDeclarationAction}
          editDeclaration={updateDeclarationAction}
        />
      )}

      {showDeleteDeclaration && (
        <ConfirmDeleteModal
          actionText={"Delete"}
          open={showDeleteDeclaration}
          close={() => setShowDeleteDeclaration(false)}
          onDelete={() => deleteDeclaration({ recordId: decToEdit.id })}
          labelText={"Delete Declaration?"}
          pText={"Are you sure you want to delete this declaration?"}
        />
      )}
    </Stack>
  );
};

export default CollaboratorDeclarationsLayout;
