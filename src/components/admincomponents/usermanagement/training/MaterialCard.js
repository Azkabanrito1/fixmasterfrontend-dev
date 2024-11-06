import { Box, Button, IconButton, Paper, Stack } from "@mui/material";
import { AiFillFilePdf } from "react-icons/ai";
import { LuFileVideo2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../../routes/paths";
import { useState } from "react";
import UpdateMaterial from "./modals/UpdateTrainingMaterial";
import { BsPencil } from "react-icons/bs";
const TrainingMaterialCard = ({ material, deleteMaterialAction }) => {
  const navigate = useNavigate();

  const [updateModal, setUpdateModal] = useState(false);

  const viewFile = ({ contentType, title, url }) => {
    if (contentType === "pdf") {
      navigate(PATH_ADMIN.viewPdf({ url, title }));
    } else if (contentType.toLowerCase() === "video") {
      navigate(PATH_ADMIN.viewVideo({ url, title }));
    }
  };

  return (
    <>
      <Paper sx={{ padding: 1.3 }}>
        <Stack justifyContent="space-between" height="100%">
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            marginBottom={1.5}
          >
            <Stack direction={"row"} spacing={2}>
              <div>
                {material.contentType === "pdf" && (
                  <AiFillFilePdf color="var(--clr-primary)" fontSize={"50px"} />
                )}
                {material.contentType.toLowerCase() === "video" && (
                  <LuFileVideo2 color="var(--clr-primary)" fontSize={"50px"} />
                )}
              </div>
              <Stack alignItems={"center"}>
                <h3 className="fs-5">{material.name}</h3>
                {/* <span className="text-muted">
                Added on {material.dateCreated}
              </span> */}
              </Stack>
            </Stack>
            <Stack>
              <IconButton
                sx={{ boxShadow: "0 0 10px #ddd" }}
                onClick={() => setUpdateModal(true)}
              >
                <BsPencil color="green" fontSize={"1rem"} />
              </IconButton>
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Button
              onClick={() =>
                viewFile({
                  contentType: material.contentType,
                  url: material.url,
                  title: material.name,
                })
              }
              sx={{
                color: "#11E981",
                textTransform: "capitalize",
                backgroundColor: "#11E9811A",
              }}
            >
              Preview file
            </Button>
            <Button
              onClick={() => deleteMaterialAction(material.id)}
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
      {updateModal && (
        <UpdateMaterial
          isOpen={updateModal}
          closeModal={() => setUpdateModal(false)}
          materialId={material?.id}
          folderId={material?.folderID}
        />
      )}
    </>
  );
};

export default TrainingMaterialCard;
