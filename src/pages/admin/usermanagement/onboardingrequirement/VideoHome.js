import AddBtn from "../../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import ConfirmDeleteModal from "../../../../components/globalcomponents/modals/ConfirmDeleteModal";
import SingleTopic from "../../../../components/admincomponents/onboardingrequirements/SingleTopic";
import Collapsible from "react-collapsible";
import styled from "styled-components";
import { Stack } from "@mui/material";
import { useState } from "react";
import AddTopic from "../../../../components/admincomponents/onboardingrequirements/modal/AddTopic";
import { useSnackbar } from "notistack";
import {
  useCreateVideoTopics,
  useDeleteVideoTopics,
  useGetVideoTopics,
  useUpdateVideoTopics,
} from "../../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { SectionHeading } from "../../../../components/globalcomponents/Utilities";
import VideoSettings from "../../../../components/admincomponents/onboardingrequirements/VideoSettings";

const VideoHome = ({ role }) => {
  const [showAddTopic, setShowAddTopic] = useState(false);
  const [showEditTopic, setShowEditTopic] = useState(false);
  const [showDeleteTopic, setShowDeleteTopic] = useState(false);
  const [topic, setTopic] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  //-----------------------------------------------------data fetching-----------------------------------------
  const { data: topicData, isLoading } = useGetVideoTopics(role?.[0]?.name);

  //---------------------------------------------------------------mutates & mutates fnc-------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddTopic(false);
    setShowEditTopic(false);
    setShowDeleteTopic(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createVideoTopics, isLoading: isCreating } =
    useCreateVideoTopics(onSuccess, onFailure);
  const { mutate: updateTopics, isLoading: isEditing } = useUpdateVideoTopics(
    onSuccess,
    onFailure
  );
  const { mutate: deleteTopics, isLoading: isDeleting } = useDeleteVideoTopics(
    onSuccess,
    onFailure
  );
  //----------------------------------modal controllers------------------------------------
  const getActiveTopic = function (id) {
    return topicData?.data?.filter((item) => item.id === id);
  };
  const addTopicHandler = () => {
    setShowAddTopic(true);
  };
  const editTopicHandler = (id) => {
    const active = getActiveTopic(id);
    setTopic(active[0]);
    setShowEditTopic(true);
  };
  const deleteTopicHandler = (id) => {
    const active = getActiveTopic(id);
    setTopic(active[0]);
    setShowDeleteTopic(true);
  };

  const addTopic = (initPayload) => {
    const payload = {
      collaboratorId: role?.[0]?.id,
      topic: initPayload.topic,
    };
    createVideoTopics(payload);
  };
  const editTopic = (initPayload) => {
    const payload = {
      id: initPayload.id,
      collaboratorId: role[0]?.id,
      topic: initPayload.content,
    };
    updateTopics(payload);
  };
  return (
    <Container>
      <Collapsible
        trigger={
          <SectionHeading className="w-100 d-flex justify-content-between">
            Video Topic
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        <GlobalBallBeat loading={isLoading} />
        <Stack spacing={3} style={{ marginBottom: "3rem" }}>
          <Stack spacing={1}>
            {topicData?.data?.map((topic, index) => (
              <SingleTopic
                key={topic?.id}
                topics={topic}
                index={index}
                editTopic={editTopicHandler}
                deleteTopic={deleteTopicHandler}
              />
            ))}
          </Stack>

          <AddBtn
            text="Add Video Topic"
            id="add-video-topic"
            action={addTopicHandler}
          />
        </Stack>

        {/* <Stack spacing={3} style={{ marginBottom: "2rem" }}>
          <VideoSettings />
        </Stack> */}
      </Collapsible>

      {showAddTopic && (
        <AddTopic
          isOpen={showAddTopic}
          closeModal={() => setShowAddTopic(false)}
          addTopics={addTopic}
          isCreating={isCreating}
        />
      )}
      {showEditTopic && (
        <AddTopic
          isOpen={showEditTopic}
          closeModal={() => setShowEditTopic(false)}
          initTopic={topic}
          editTopic={editTopic}
          isCreating={isEditing}
        />
      )}

      {showDeleteTopic && (
        <ConfirmDeleteModal
          actionText={"Delete"}
          open={showDeleteTopic}
          close={() => setShowDeleteTopic(false)}
          onDelete={() => deleteTopics(topic?.id)}
          labelText={"Delete Video Topic?"}
          pText={"Are you sure you want to delete this video topic?"}
          isLoading={isDeleting}
        />
      )}
    </Container>
  );
};

export default VideoHome;

export const Container = styled.div`
  margin-top: -3rem;
  margin-bottom: -1rem;

  .Collapsible {
    padding-block: 1rem;
    margin-inline: auto;
    padding-inline: 1rem;
    font-weight: bold;
    &:not(:last-child) {
    }

    .Collapsible__trigger {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-block: 20px;
      font-size: 24px;
      cursor: pointer;
      .fas {
        font-size: 1rem;
        transition: 350ms ease-in-out;
      }

      &[aria-expanded="true"] .fas {
        rotate: 90deg;
      }
      span {
        /* font-size: 1rem; */
        font-weight: none;
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        font-size: 1.3rem;
        width: 100px;
      }
    }
  }
`;
