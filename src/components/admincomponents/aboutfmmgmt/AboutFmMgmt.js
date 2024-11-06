import { Stack, styled } from "@mui/material";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../globalcomponents/Utilities";
import { Button } from "@mui/material";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import { useGetFmFolders } from "../../../hooks/useQueries/useAdmin";
import { useState } from "react";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import AboutFmFolderCard from "./AboutFmFolderCard";
import AddAboutFmFolder from "./AddAboutFmFolder";
import EditAboutFmFolder from "./EditAboutFmFolder";

const AboutFmMgmt = () => {
  // =====================hooks================================
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showEditFolder, setShowEditFolder] = useState(false);
  const [showDeleteFolder, setShowDeleteFolder] = useState(false);
  const [activeFolder, setActiveFolder] = useState({});

  // =======================fetching data =======================
  const { data: foldersData, isLoading } = useGetFmFolders();

  // ========================actions=====================

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
            About FixMaster
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
            <p className="text-muted">You have not added a folder yet</p>
            <AddBtn
              action={openAddFolder}
              text="Add Folder"
              id="add-folder-btn"
              mt={"1rem"}
            />
          </div>
        </Stack>
      ) : (
        <UserCardsContainer>
          {foldersData?.data?.map((folder) => (
            <AboutFmFolderCard
              folder={folder}
              key={folder.folderId}
              editFolderAction={openEditFolder}
              deleteFolderAction={openDeleteFolder}
            />
          ))}
        </UserCardsContainer>
      )}

      {showAddFolder && (
        <AddAboutFmFolder isOpen={showAddFolder} closeModal={closedAddFolder} />
      )}

      {showEditFolder && (
        <EditAboutFmFolder
          isOpen={showEditFolder}
          closeModal={closeEditFolder}
          activeFolder={activeFolder}
        />
      )}

      {showDeleteFolder && (
        <ConfirmDeleteModal
          open={showDeleteFolder}
          close={closeDeleteFolder}
          labelText={"Delete Training Folder"}
          pText={"Are you sure you want to delete this folder"}
          actionText={"Delete"}
          onDelete={() => console.log(`Deleted ${activeFolder.name}`)}
        />
      )}
    </Stack>
  );
};

export default AboutFmMgmt;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
