import React from "react";
import { CallContainer } from "../../../components/callcentercomponent/dashboardcomponent/CallCard";
import SingleCallCard from "../../../components/callcentercomponent/dashboardcomponent/SingleCallCard";

const ManagementHome = () => {
  const managements = [
    {
      id: 0,
      icon: "/images/callLog.png",
      title: "Call Logs",
      description: "View missed calls, received calls, and schedule calls",
      to: "/call-center/call-logs",
      notificationCount: null,
      color: "#f37238",
    },
    {
      id: 1,
      icon: "/images/callAction.png",
      title: "Call Actions",
      description: "Book A fix for customers, records comments.",
      to: "/call-center/call-actions",
      notificationCount: null,
      color: "#f37238",
    },
  ];

  return (
    <CallContainer>
      {managements.map((call) => {
        return <SingleCallCard key={call.id} call={call} />;
      })}
    </CallContainer>
  );
};

export default ManagementHome;
