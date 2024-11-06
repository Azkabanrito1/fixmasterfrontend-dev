import { useEffect, useState, useCallback } from "react";
import useLoginDetails from "./useLoginDetails";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const useMessaging = (fixId) => {
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const { token } = useLoginDetails();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(
        `https://sfwapps.com.ng:44001/usermessage?access_token=${token}&fixId=${fixId}`
      )
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.start().catch((err) => console.error(err));

    setConnection(connection);

    return () => connection.stop().catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on("LoadMessages", (messages) => {
        setMessages(messages.data);
      });

      connection.on("ReceiveMessage", (username, message) => {
        onReceiveMessage(username, message);
      });
    }
  }, [connection]);

  const onReceiveMessage = (message) => {
    setMessages((prev) => [...prev, JSON.parse(message)]);
  };

  const handleSend = useCallback(
    (message) => {
      if (connection) {
        connection
          .send("SendMessage", String(fixId), message)
          .catch((err) => console.error(err));
      }
    },
    [connection]
  );

  return { messages, handleSend };
};

export default useMessaging;
