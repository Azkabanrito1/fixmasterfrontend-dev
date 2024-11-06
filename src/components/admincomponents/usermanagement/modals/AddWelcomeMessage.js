import { useState } from "react";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";

const AddWelcomeMessage = ({
  addMessage,
  isOpen,
  closeModal,
  initMessage,
  editMessage,
}) => {
  const [message, setMessage] = useState(initMessage?.content || "");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const add = () => {
    if (!message) {
      setError("Please input a Message");
      return;
    }

    if (initMessage.id) {
      const payload = { id: initMessage.id, message };
      editMessage(payload);
    } else {
      const payload = { message };
      addMessage(payload);
    }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={initMessage.id ? "Edit Message" : "Add Message"}
      />

      <GlobalTextArea
        labelText={"Message"}
        inputName="Message"
        inputValue={message}
        handleChange={handleChange}
        error={error}
        errorMessage={error}
        required
      />

      <GlobalBtn className="mt-3" onClick={add} mx="auto">
        {initMessage.id ? "Edit" : "Add"}
      </GlobalBtn>
    </GlobalModal>
  );
};

export default AddWelcomeMessage;
