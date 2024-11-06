import { useState } from "react";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TrainingMaterialCard from "./MaterialCard";
import {
  BackBtn,
  GridCardsContainer,
  PageHeading,
} from "../../../globalcomponents/Utilities";
import AddTrainingMaterial from "./modals/AddTrainingMaterial";
import AddBtn from "../../../franchiseecomponents/jobsmanagement/AddBtn";
import {
  useDeleteTrainingMaterial,
  useGetMaterialsByFolder,
} from "../../../../hooks/useQueries/useAdmin";
import ConfirmDeleteModal from "../../../globalcomponents/modals/ConfirmDeleteModal";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import { useSnackbar } from "notistack";

const TrainingFolderFiles = () => {
  // ==================hooks====================
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showDeleteMaterial, setShowDeleteMaterial] = useState(false);
  const [activeMaterial, setActiveMaterial] = useState({});
  const { folderId } = useParams();

  // =======================fetching data =======================
  const { data: materialsData, isLoading } = useGetMaterialsByFolder(folderId);

  // =========================actions=====================
  const openAddMaterial = () => setShowAddMaterial(true);
  const closeAddMaterial = () => {
    setShowAddMaterial(false);
    setActiveMaterial({});
  };
  const openDeleteMaterial = (id) => {
    const material = materialsData?.data?.filter((file) => file.id === id);
    setActiveMaterial(material?.[0]);
    setShowDeleteMaterial(true);
  };
  const closeDeleteMaterial = () => {
    setShowDeleteMaterial(false);
    setActiveMaterial({});
  };

  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeDeleteMaterial();
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: deleteTrainingMaterial } = useDeleteTrainingMaterial({
    folderId,
    onSuccess,
    onFailed: onError,
  });

  return (
    <Stack spacing={4} height={"100%"}>
      <div>
        <BackBtn />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <PageHeading className="text-capitalize me-auto mx-auto">
            {" "}
            Materials
          </PageHeading>
          <Button
            onClick={openAddMaterial}
            sx={{
              bgcolor: "var(--clr-primary)",
              color: "#fff",
            }}
          >
            Add Material
          </Button>
        </Stack>
      </div>

      <GlobalBallBeat loading={isLoading} />

      {materialsData?.data?.length === 0 ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          flexGrow={1}
        >
          <div>
            <p className="text-muted">
              You have not added a material yet to this folder
            </p>
            <AddBtn
              action={openAddMaterial}
              text="Add Training Material"
              id="add-material-btn"
              mt={"1rem"}
            />
          </div>
        </Stack>
      ) : (
        <UserCardsContainer>
          {materialsData?.data?.map((material) => (
            <TrainingMaterialCard
              material={material}
              key={material.id}
              deleteMaterialAction={() => openDeleteMaterial(material.id)}
            />
          ))}
        </UserCardsContainer>
      )}

      {showAddMaterial && (
        <AddTrainingMaterial
          folderId={+folderId}
          isOpen={showAddMaterial}
          closeModal={closeAddMaterial}
        />
      )}

      {showDeleteMaterial && (
        <ConfirmDeleteModal
          open={showDeleteMaterial}
          close={closeDeleteMaterial}
          labelText={"Delete Training Material"}
          pText={"Are you sure you want to delete this material"}
          actionText={"Delete"}
          onDelete={() => deleteTrainingMaterial(activeMaterial)}
        />
      )}
    </Stack>
  );
};

export default TrainingFolderFiles;

const UserCardsContainer = styled(GridCardsContainer)`
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
`;
