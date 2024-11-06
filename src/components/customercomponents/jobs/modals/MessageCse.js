import { useState } from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import {
  Message,
  MessageArea,
  SearchBar,
  SendMessageBar,
} from "../MessageCSEComponents";
import useMessaging from "../../../../hooks/useMessaging";
import { useGetUserId } from "../../../../hooks/useQueries/useIdentity";

const MessageCSE = ({ isOpen, closeModal, recipient, fixId }) => {
  const [searchStr, setSearchStr] = useState("");
  const [message, setMessage] = useState("");
  const { data: idData } = useGetUserId();
  const { messages, handleSend } = useMessaging(fixId);

  const handleSearchStrChange = (e) => {
    setSearchStr(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const messagesTemplate = messages.map((message) => (
    <Message key={message.id} message={message} id={idData?.id} />
  ));

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      overflowY="hidden"
      height="90%"
    >
      <div
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <AltModalHeader closeModal={closeModal} mb="0" />
        <SearchBar
          handleChange={handleSearchStrChange}
          handleSubmit={handleSearch}
          searchStr={searchStr}
          recipient={recipient}
        />
        <MessageArea>{messagesTemplate}</MessageArea>
        <SendMessageBar
          message={message}
          handleChange={handleMessageChange}
          handleSend={(e) => {
            e.preventDefault();
            handleSend(message);
            setMessage("");
          }}
        />
      </div>
    </GlobalModal>
  );
};

export default MessageCSE;
