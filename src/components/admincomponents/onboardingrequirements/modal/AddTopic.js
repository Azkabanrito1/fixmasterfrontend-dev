import React, { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";

const AddTopic = ({
  isOpen,
  closeModal,
  initTopic,
  editTopic,
  addTopics,
  isEditing,
  isCreating,
}) => {
  const [topic, setTopic] = useState(initTopic?.topic || "");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTopic(e.target.value);
  };
  const addTopic = () => {
    if (!topic) {
      setError("Please input a video topic");
    }
    if (initTopic?.collaboratorId) {
      const payload = { id: initTopic?.id, content: topic };
      editTopic(payload);
    } else {
      const payload = { topic };
      addTopics(payload);
    }
  };
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={
          initTopic?.collaboratorId ? "Edit Video Topic" : "Add Video Topic"
        }
      />

      <GlobalTextArea
        labelText={"Video Topic"}
        inputName="topic"
        inputValue={topic}
        handleChange={handleChange}
        errorMessage={error}
        error={error}
        required
      />

      <GlobalBtn className="mt-3" onClick={addTopic} mx="auto">
        {initTopic?.collaboratorId ? "Edit" : "Add"}
      </GlobalBtn>
      <GlobalFullScreenLoader open={isCreating || isEditing} />
    </GlobalModal>
  );
};

export default AddTopic;
