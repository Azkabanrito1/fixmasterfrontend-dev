import React, { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";

const AddThankYouMessage = ({
  isOpen,
  closeModal,
  initMessage,
  editMessage,
  addMessages,
  isEditing,
  isCreating,
}) => {
  const [message, setMessage] = useState(initMessage?.content || "");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const addMessage = () => {
    if (!message) {
      setError("Please input a message");
    }
    if (initMessage?.id) {
      const payload = { id: initMessage?.id, content: message };
      editMessage(payload);
    } else {
      const payload = { message };
      addMessages(payload);
    }
  };
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={initMessage?.id ? "Edit Message" : "Add Message"}
      />

      <GlobalTextArea
        labelText={"Thank You Message"}
        inputName="message"
        inputValue={message}
        handleChange={handleChange}
        errorMessage={error}
        error={error}
        required
      />

      <GlobalBtn className="mt-3" onClick={addMessage} mx="auto">
        {initMessage?.id ? "Edit" : "Add"}
      </GlobalBtn>
      <GlobalFullScreenLoader open={isCreating || isEditing} />
    </GlobalModal>
  );
};

export default AddThankYouMessage;
