import {
  useCreateVideoTopicSetting,
  useDeleteVideoTopicSetting,
  useGetVideoTopicSetting,
  useUpdateVideoTopicSetting,
} from "../../../hooks/useQueries/useAdmin";
import { SectionHeading } from "../../globalcomponents/Utilities";
import Collapsible from "react-collapsible";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import SingleVideoSetting from "./SingleVideoSetting";
import AddVideoSetting from "./modal/AddVideoSetting";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";

const VideoSettings = () => {
  const [showAddVideoTopicSetting, setShowAddVideoTopicSetting] =
    useState(false);
  const [showEditVideoTopicSetting, setShowEditVideoTopicSetting] =
    useState(false);
  const [showDeleteVideoTopicSetting, setShowDeleteVideoTopicSetting] =
    useState(false);
  const [videoTopicSetting, setVideoTopicSetting] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //---------------------------------------------------------------mutates & mutates fnc-------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddVideoTopicSetting(false);
    setShowEditVideoTopicSetting(false);
    setShowDeleteVideoTopicSetting(false);
  };

  function onFailed(response) {
    enqueueSnackbar(response.message, { variant: "error" });
  }

  //-----------------------------------------------------data fetching-----------------------------------------

  const { mutate: createVideoTopicSetting, isLoading: isCreating } =
    useCreateVideoTopicSetting(onSuccess, onFailed);

  const { data: getVideoTopicSetting, isLoading } = useGetVideoTopicSetting();

  // console.log(videoTopicSettings);

  const { mutate: updateVideoTopicSetting, isLoading: isEditing } =
    useUpdateVideoTopicSetting(onSuccess, onFailed);

  const { mutate: deleteVideoTopicSetting, isLoading: isDeleting } =
    useDeleteVideoTopicSetting(onSuccess, onFailed);

  //----------------------------------modal controllers------------------------------------
  const getActiveVideoTopicSetting = function (id) {
    return getVideoTopicSetting?.data?.filter((item) => item.id === id);
  };
  const addVideoTopicSettingHandler = () => {
    setShowAddVideoTopicSetting(true);
  };
  const editVideoTopicSettingHandler = (id) => {
    const active = getActiveVideoTopicSetting(id);
    setVideoTopicSetting(active[0]);
    setShowEditVideoTopicSetting(true);
  };
  const deleteVideoTopicSettingHandler = (id) => {
    const active = getActiveVideoTopicSetting(id);
    setVideoTopicSetting(active[0]);
    setShowDeleteVideoTopicSetting(true);
  };

  const addVideoTopicSetting = (initPayload) => {
    const payload = {
      fileSize: initPayload.fileSize,
      fileType: initPayload.fileType,
    };
    createVideoTopicSetting(payload);
  };

  const editVideoTopicSetting = (initPayload) => {
    const payload = {
      id: initPayload.id,
      fileSize: initPayload.fileSize,
      fileType: initPayload.fileType,
    };
    updateVideoTopicSetting(payload);
  };

  return (
    <div style={{ marginTop: "-2rem" }}>
      <Collapsible
        trigger={
          <SectionHeading className="w-100 d-flex justify-content-between">
            Video Topic Settings
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        <GlobalBallBeat loading={isLoading} />
        <Stack spacing={3} style={{ marginBottom: "3rem" }}>
          <Stack spacing={1}>
            {getVideoTopicSetting?.data?.map((videoTopicSetting, index) => (
              <SingleVideoSetting
                key={videoTopicSetting?.id}
                videoTopicSetting={videoTopicSetting}
                videoTopicSettings={getVideoTopicSetting?.data}
                index={index}
                editVideoTopicSetting={editVideoTopicSettingHandler}
                deleteVideoTopicSetting={deleteVideoTopicSettingHandler}
              />
            ))}
          </Stack>
          <div style={{ marginBottom: "-1rem", marginTop: 0 }}>
            <AddBtn
              text="Add Video Topic Setting"
              id="add-videoTopicSetting"
              action={addVideoTopicSettingHandler}
            />
          </div>
        </Stack>
      </Collapsible>

      {showAddVideoTopicSetting && (
        <AddVideoSetting
          isOpen={showAddVideoTopicSetting}
          closeModal={() => setShowAddVideoTopicSetting(false)}
          addVideoTopicSetting={addVideoTopicSetting}
          isCreating={isCreating}
        />
      )}
      {showEditVideoTopicSetting && (
        <AddVideoSetting
          isOpen={showEditVideoTopicSetting}
          closeModal={() => setShowEditVideoTopicSetting(false)}
          initVideoTopicSetting={videoTopicSetting}
          editVideoTopicSetting={editVideoTopicSetting}
          isCreating={isEditing}
        />
      )}

      {showDeleteVideoTopicSetting && (
        <ConfirmDeleteModal
          actionText={"Delete"}
          open={showDeleteVideoTopicSetting}
          close={() => setShowDeleteVideoTopicSetting(false)}
          onDelete={() => deleteVideoTopicSetting(videoTopicSetting?.id)}
          labelText={"Delete Video Setting?"}
          pText={"Are you sure you want to delete this Video Setting?"}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default VideoSettings;
