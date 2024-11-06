import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import TechnicianOnboarding from "../../../components/qamastercomponent/dashboardcomponent/TechnicianOnboarding";
import JobCard from "../../../components/qamastercomponent/dashboardcomponent/JobCard";
import RequestSupport from "../../../components/qamastercomponent/dashboardcomponent/RequestSupport";
import { useGetUserDashboard } from "../../../hooks/useQueries/useIdentity";
import DashboardAccountSummary from "../../../components/globalcomponents/GlobalDashboardAccountSummary";
import UpcomingTrainings from "../../../components/globalcomponents/UpcomingEvents";
import DashboardTargets from "../../../components/globalcomponents/DashboardTargets";

const QaMasterHome = () => {
  const { data: dashboardData } = useGetUserDashboard();

  return (
    <div>
      <PageContainer>
        <div>
          <DashboardAccountSummary
            data={dashboardData?.data}
            dashboardSummary={true}
          />
          <JobCard data={dashboardData?.data} />
          <TechnicianOnboarding data={dashboardData?.data} />
          <RequestSupport data={dashboardData?.data} />
        </div>
        <PageAside>
          <UpcomingTrainings events={dashboardData?.data?.fixSchedule} />
          <DashboardTargets dashBoardData={dashboardData?.data} />
        </PageAside>
      </PageContainer>
    </div>
  );
};

export default QaMasterHome;
