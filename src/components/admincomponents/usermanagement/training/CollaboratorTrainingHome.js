import { Stack, styled } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../globalcomponents/Utilities";
import { Button } from "@mui/material";
import AddBtn from "../../../franchiseecomponents/jobsmanagement/AddBtn";
import {
  useGetAllCollabTrainingMCQ,
  useGetFoldersByType,
} from "../../../../hooks/useQueries/useAdmin";
import { useState } from "react";
import AddTrainingFolder from "./modals/AddTrainingFolder";
import TrainingFolderCard from "./TrainingFolderCard";
import ConfirmDeleteModal from "../../../globalcomponents/modals/ConfirmDeleteModal";
import EditTrainingFolder from "./modals/EditTrainingFolder";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import { useLocation } from "react-router-dom";

const CollaboratorTrainingHome = ({ useCategory, useDuration, role }) => {
  // =====================hooks================================
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [showDeleteFolder, setShowDeleteFolder] = useState(false);
  const [activeFolder, setActiveFolder] = useState({});

  const { data: rolesData } = useGetCollaboratorRoles();

  const collaboratorData = rolesData?.data?.filter(
    (collab) => collab.name.toLowerCase() === role.split(" ")[0].toLowerCase()
  )?.[0];

  const location = useLocation();

  const getDynamicSegment = () => {
    const pathSegments = location.pathname.split("/");
    const index = pathSegments.findIndex((segment) => segment === "training");
    if (index !== -1 && index + 1 < pathSegments.length) {
      return pathSegments[index + 1];
    }
    return null;
  };

  const mcqType = getDynamicSegment();

  // =======================fetching data =======================
  const { data: trainingMCQData } = useGetAllCollabTrainingMCQ(
    collaboratorData?.id
  );

  const mcqTestData = trainingMCQData?.data?.find(
    (item) => item.linkTo === mcqType
  );

  const testTypeId = mcqTestData?.id;
  const trainingType = mcqTestData?.linkTo;

  const { data: foldersData, isLoading } = useGetFoldersByType(testTypeId);

  // ========================actions=====================
  const hasFiles =
    trainingType?.toLowerCase() === "aptitude" ||
    trainingType?.toLowerCase() === "interview"
      ? false
      : true;

  const openAddFolder = () => setShowAddFolder(true);
  const closedAddFolder = () => {
    setShowAddFolder(false);
    setActiveFolder({});
  };
  const openEditFolder = (id) => {
    const folder = foldersData?.data?.filter(
      (folder) => folder.folderId === id
    );
    setActiveFolder(folder?.[0]);
    setShowEditFolder(true);
  };
  const closeEditFolder = () => {
    setShowEditFolder(false);
    setActiveFolder({});
  };
  const openDeleteFolder = (id) => {
    const folder = foldersData?.data?.filter(
      (folder) => folder.folderId === id
    );
    setActiveFolder(folder?.[0]);
    setShowDeleteFolder(true);
  };
  const closeDeleteFolder = () => {
    setShowDeleteFolder(false);
    setActiveFolder({});
  };

  return (
    <Stack spacing={4} height={"100%"}>
      <div>
        <BackBtn />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <PageHeading className="text-capitalize me-auto mx-auto">
            {trainingType} Training & MCQs
          </PageHeading>

          <Button
            onClick={openAddFolder}
            sx={{
              bgcolor: "var(--clr-primary)",
              color: "#fff",
            }}
          >
            Add Folder
          </Button>
        </Stack>
      </div>

      <GlobalBallBeat loading={isLoading} />

      {!foldersData?.data?.length ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <div>
            <p className="text-muted">
              You have not added a {trainingType} training folder yet
            </p>
            <AddBtn
              action={openAddFolder}
              text="Add Training Folder"
              id="add-folder-btn"
              mt={"1rem"}
            />
          </div>
        </Stack>
      ) : (
        <UserCardsContainer>
          {foldersData?.data?.map((folder) => (
            <TrainingFolderCard
              folder={folder}
              key={folder.folderId}
              editFolderAction={openEditFolder}
              deleteFolderAction={openDeleteFolder}
              role={role}
              hasFiles={hasFiles}
              useCategory={useCategory}
              useDuration={useDuration}
            />
          ))}
        </UserCardsContainer>
      )}

      {showAddFolder && (
        <AddTrainingFolder
          isOpen={showAddFolder}
          closeModal={closedAddFolder}
          testTypeId={testTypeId}
        />
      )}

      {showEditFolder && (
        <EditTrainingFolder
          isOpen={showEditFolder}
          closeModal={closeEditFolder}
          activeFolder={activeFolder}
          testTypeId={testTypeId}
        />
      )}

      {showDeleteFolder && (
        <ConfirmDeleteModal
          open={showDeleteFolder}
          close={closeDeleteFolder}
          labelText={"Delete Training Folder"}
          pText={"Are you sure you want to delete this folder"}
          actionText={"Delete"}
          onDelete={() => console.log(`Deleted ${activeFolder.folderName}`)}
        />
      )}
    </Stack>
  );
};

export default CollaboratorTrainingHome;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
