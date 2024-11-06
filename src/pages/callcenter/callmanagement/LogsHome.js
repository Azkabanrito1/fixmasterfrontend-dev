import React from "react";
import { CallContainer } from "../../../components/callcentercomponent/dashboardcomponent/CallCard";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import SingleCallCard from "../../../components/callcentercomponent/dashboardcomponent/SingleCallCard";

const LogsHome = () => {
  const logs = [
    {
      id: 0,
      icon: "/images/missed.png",
      title: "Missed Calls",
      description: "View all missed calls",
      to: "/call-center/call-logs/missed",
      notificationCount: null,
      color: "#f37238",
    },
    {
      id: 1,
      icon: "/images/received.png",
      title: "Received Calls",
      description: "View all received calls.",
      to: "/call-center/call-logs/received",
      notificationCount: null,
      color: "#f37238",
    },
  ];

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Call Logs</PageHeading>
      </div>
      <CallContainer>
        {logs.map((log) => {
          return <SingleCallCard key={log.id} call={log} />;
        })}
      </CallContainer>
      ;
    </>
  );
};

export default LogsHome;
