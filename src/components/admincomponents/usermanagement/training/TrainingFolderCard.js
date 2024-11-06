import { Button, Chip, IconButton, Paper, Stack } from "@mui/material";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";

const TrainingFolderCard = ({
  folder,
  deleteFolderAction,
  editFolderAction,
  useCategory,
  useDuration,
  hasFiles,
  role,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  return (
    <Paper sx={{ padding: 1.3 }}>
      <Stack justifyContent="space-between" height="100%">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          marginBottom={1.5}
        >
          <Stack direction={"row"} spacing={1}>
            <img
              src="/images/training-folder.png"
              alt=""
              width={"54px"}
              height={"54px"}
            />
            <Stack>
              <h3 className="fs-5">{folder.folderName}</h3>

              {hasFiles && (
                <span className="text-muted">
                  {folder.totalTrainingMaterials} Files
                </span>
              )}

              <span className="text-muted">{folder.totalMcq} MCQs</span>
            </Stack>
          </Stack>
          <Stack alignSelf={"flex-end"}>
            <Chip
              label={folder?.status}
              color={
                folder?.status.toLowerCase() === "active" ? "success" : "error"
              }
            />
          </Stack>

          <Stack spacing={1}>
            {/* <IconButton
              sx={{ boxShadow: "0 0 10px #ddd" }}
              onClick={() => deleteFolderAction(folder.folderId)}
            >
              <BsTrash color="red" fontSize={"1rem"} />
            </IconButton> */}
            <IconButton
              sx={{ boxShadow: "0 0 10px #ddd" }}
              onClick={() => editFolderAction(folder.folderId)}
            >
              <BsPencil color="green" fontSize={"1rem"} />
            </IconButton>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          {hasFiles && (
            <Button
              onClick={() =>
                navigate(
                  `${PATH_ADMIN.folderMaterials(folder.folderId)}?role=${role}`
                )
              }
              sx={{
                color: "#11E981",
                textTransform: "capitalize",
                backgroundColor: "#11E9811A",
              }}
            >
              View and Update files
            </Button>
          )}
          <Button
            onClick={() =>
              navigate(
                `${PATH_ADMIN.folderMcqs(
                  folder.folderId
                )}?role=${role}&useCategory=${!!useCategory}&useDuration=${!!useDuration}`
              )
            }
            sx={{
              color: "#F26222",
              textTransform: "capitalize",
              backgroundColor: "#F262221A",
            }}
          >
            View and Update MCQs
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TrainingFolderCard;
