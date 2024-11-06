import { useEffect, useState } from "react";
import useLoginDetails from "./useLoginDetails";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [connection, setConnection] = useState(null);
  const { token } = useLoginDetails();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(
        `https://sfwapps.com.ng:44001/pushnotification?access_token=${token}`
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
      connection.on("LoadNotificationMessages", (notificationsData) => {
        setNotifications(notificationsData.data.inAppMessageList);
      });

      connection.on("ReceiveNotification", (notification) => {
        onReceiveNotification(notification);
      });
    }
  }, [connection]);

  const onReceiveNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  return { notifications };
};

export default useNotifications;
