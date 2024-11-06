import { Button, IconButton, Paper, Stack } from "@mui/material";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";

const AboutFmFolderCard = ({
  folder,
  deleteFolderAction,
  editFolderAction,
}) => {
  const navigate = useNavigate();

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

              <span className="text-muted">
                {folder.totalTrainingMaterials} Files
              </span>
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <IconButton
              sx={{ boxShadow: "0 0 10px #ddd" }}
              onClick={() => deleteFolderAction(folder.folderId)}
            >
              <BsTrash color="red" fontSize={"1rem"} />
            </IconButton>
            <IconButton
              sx={{ boxShadow: "0 0 10px #ddd" }}
              onClick={() => editFolderAction(folder.folderId)}
            >
              <BsPencil color="green" fontSize={"1rem"} />
            </IconButton>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Button
            onClick={() =>
              navigate(`${PATH_ADMIN.aboutFmFiles(folder.folderId)}`)
            }
            sx={{
              color: "#11E981",
              textTransform: "capitalize",
              backgroundColor: "#11E9811A",
            }}
          >
            View and Update files
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default AboutFmFolderCard;
