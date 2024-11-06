import { useOutletContext } from "react-router-dom";
import DashboardAccountSummary from "../../components/globalcomponents/GlobalDashboardAccountSummary";
import {
  PageAside,
  PageContainer,
} from "../../components/layouts/dashboard/DashboardUtilities";
import UpcomingEvents from "../../components/globalcomponents/UpcomingEvents";
import DashboardTargets from "../../components/globalcomponents/DashboardTargets";
import TechnicianUnassignedJobs from "../../components/techniciancomponents/dashboardcomponents/UnassignedJobs";
import TechnicianDashboardCards from "../../components/techniciancomponents/dashboardcomponents/JobsCards";

const TechnicianHome = () => {
  const { dashboardData } = useOutletContext();

  return (
    <PageContainer>
      <div>
        <DashboardAccountSummary data={dashboardData} />
        <TechnicianUnassignedJobs data={dashboardData?.newJobs} />
        <DashboardTargets data={dashboardData} />
        <TechnicianDashboardCards data={dashboardData} />
      </div>
      <PageAside>
        <UpcomingEvents
          title="Upcoming Events"
          events={dashboardData?.fixSchedule}
        />
      </PageAside>
    </PageContainer>
  );
};

export default TechnicianHome;
