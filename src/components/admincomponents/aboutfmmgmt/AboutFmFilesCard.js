import { Box, Button, Paper, Stack } from "@mui/material";
import { AiFillFilePdf } from "react-icons/ai";
import { LuFileVideo2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import {
  useGetFmFiles,
  useGetFmFolders,
} from "../../../hooks/useQueries/useAdmin";
import { useParams } from "react-router-dom";
import { AiTwotoneFileImage } from "react-icons/ai";
import styled from "styled-components";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../globalcomponents/Utilities";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useState } from "react";
import AddTrainingMaterial from "../usermanagement/training/modals/AddTrainingMaterial";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";
import AddAboutFmFile from "./AddAboutFmFile";

const AboutFmFilesCard = () => {
  const navigate = useNavigate();
  const { folderId } = useParams();
  const [showAddFile, setShowAddFile] = useState(false);
  const [showDeleteFile, setShowDeleteFile] = useState(false);
  const [activeFile, setActiveFile] = useState({});

  const { data: filesData, isLoading } = useGetFmFiles(folderId);

  const { data: foldersData } = useGetFmFolders();

  const folder = foldersData?.data?.find((folder) => {
    return folder?.folderId === Number(folderId);
  });

  const openAddFile = () => setShowAddFile(true);
  const closeAddFile = () => {
    setShowAddFile(false);
    setActiveFile({});
  };
  const openDeleteFile = (id) => {
    const file = filesData?.data?.filter((file) => file.id === id);
    setActiveFile(file?.[0]);
    setShowDeleteFile(true);
  };
  const closeDeleteFile = () => {
    setShowDeleteFile(false);
    setActiveFile({});
  };

  const files = filesData?.data;

  return (
    <Stack spacing={4} height={"100%"}>
      <div>
        <BackBtn />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <PageHeading className="text-capitalize me-auto mx-auto">
            {folder?.folderName} Files
          </PageHeading>
          <Button
            onClick={openAddFile}
            sx={{
              bgcolor: "var(--clr-primary)",
              color: "#fff",
            }}
          >
            Add File
          </Button>
        </Stack>
      </div>

      <GlobalBallBeat loading={isLoading} />
      {files?.data?.length === 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <div>
            <p className="text-muted">
              You have not yet added a file to this folder
            </p>
            <AddBtn
              action={openAddFile}
              text="Add File"
              id="add-file-btn"
              mt={"1rem"}
            />
          </div>
        </Stack>
      ) : (
        <UserCardsContainer>
          {files?.map((file) => {
            return (
              <Paper sx={{ padding: 1.3 }} key={file.fileId}>
                <Stack justifyContent="space-between" height="100%">
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    marginBottom={1.5}
                  >
                    <Stack direction={"row"} spacing={2}>
                      <div>
                        {file.fileType === "document" && (
                          <AiFillFilePdf
                            color="var(--clr-primary)"
                            fontSize={"50px"}
                          />
                        )}
                        {file.fileType === "video" && (
                          <LuFileVideo2
                            color="var(--clr-primary)"
                            fontSize={"50px"}
                          />
                        )}
                        {file.fileType === "image" && (
                          <AiTwotoneFileImage
                            color="var(--clr-primary)"
                            fontSize={"50px"}
                          />
                        )}
                      </div>
                      <Stack alignItems={"center"}>
                        <h3 className="fs-5">{file.fileName}</h3>
                        {/* <span className="text-muted">
                Added on {file.dateCreated}
              </span> */}
                      </Stack>
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Link to={file.fileURL} target="_blank">
                      <Button
                        sx={{
                          color: "#11E981",
                          textTransform: "capitalize",
                          backgroundColor: "#11E9811A",
                          width: "100%",
                        }}
                      >
                        Preview file
                      </Button>
                    </Link>
                    <Button
                      onClick={() => openDeleteFile(file.id)}
                      sx={{
                        color: "#F26222",
                        textTransform: "capitalize",
                        backgroundColor: "#F262221A",
                      }}
                    >
                      Delete File
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </UserCardsContainer>
      )}

      {showAddFile && (
        <AddAboutFmFile
          folderId={+folderId}
          isOpen={showAddFile}
          closeModal={closeAddFile}
          folderName={folder?.folderName}
        />
      )}

      {showDeleteFile && (
        <ConfirmDeleteModal
          open={showDeleteFile}
          close={closeDeleteFile}
          labelText={"Delete About Fm File"}
          pText={"Are you sure you want to delete this file"}
          actionText={"Delete"}
          onDelete={() => console.log(`Deleted ${activeFile.name}`)}
        />
      )}
    </Stack>
  );
};

export default AboutFmFilesCard;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
