import React from "react";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import DashboardAccountSum from "../../../components/callcentercomponent/dashboardcomponent/DashboardAccountSum";
import CallCard from "../../../components/callcentercomponent/dashboardcomponent/CallCard";
import DashboardCallAnalysis from "../../../components/callcentercomponent/dashboardcomponent/DashboardCallAnalysis";
import CallDashboardCards from "../../../components/callcentercomponent/dashboardcomponent/CallDashboardCards";
import CallPerMonth from "../../../components/callcentercomponent/dashboardcomponent/CallPerMonth";

const CallHome = () => {
  return (
    <PageContainer style={{ backgroundColor: "#f2f2f2" }}>
      <div>
        <DashboardAccountSum />
        <CallCard />
        <DashboardCallAnalysis />
      </div>
      <PageAside>
        <CallDashboardCards />
        <CallPerMonth />
      </PageAside>
    </PageContainer>
  );
};

export default CallHome;
