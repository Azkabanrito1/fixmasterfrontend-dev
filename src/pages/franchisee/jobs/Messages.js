import { useParams } from "react-router-dom";
import { useState } from "react";
import { Stack } from "@mui/material";
import {
  Message,
  MessageArea,
  SearchBar,
  SendMessageBar,
} from "../../../components/customercomponents/jobs/MessageCSEComponents";
import { useGetUserId } from "../../../hooks/useQueries/useIdentity";
import useMessaging from "../../../hooks/useMessaging";
import { useGetJobDetails } from "../../../hooks/useQueries/useJobs";

const JobMessages = () => {
  const [searchStr, setSearchStr] = useState("");
  const [message, setMessage] = useState("");
  const { data: idData } = useGetUserId();
  const { fixId } = useParams();
  const { data: fixDetails } = useGetJobDetails(fixId);
  const { messages, handleSend } = useMessaging(message, setMessage);

  const recipient = {
    name: fixDetails?.data?.customerName ?? "",
    role: "Customer",
  };

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
    <Stack
      // height={"min(60%, 450px)"}
      direction={"row"}
      justifyContent={"center"}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "min(450px, 100%)",
        }}
      >
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
    </Stack>
  );
};

export default JobMessages;
