import OngoingIndex from "../../../components/csecomponent/cse/dashboardComponent/jobs/ongoings/OngoingIndex";
import {
  PageContainer,
  PageAside,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import UnassignedHome from "../../../components/csecomponent/cse/dashboardComponent/jobs/unassign/UnassignedHome";
import SupplyIndex from "../../../components/csecomponent/cse/dashboardComponent/supplier/SupplyIndex";
import DashboardAccountSummary from "../../../components/globalcomponents/GlobalDashboardAccountSummary";
import { useGetUserDashboard } from "../../../hooks/useQueries/useIdentity";
import CseJobsCards from "../../../components/csecomponent/cse/dashboardComponent/dasboard/CseJobsCard";
import UpcomingTrainings from "../../../components/globalcomponents/UpcomingEvents";

const DasboardContent = () => {
  const { data: dashboardData } = useGetUserDashboard();
  return (
    <>
      <PageContainer>
        <div>
          <DashboardAccountSummary
            data={dashboardData?.data}
            dashboardSummary={true}
          />
          <CseJobsCards data={dashboardData?.data} />
          <OngoingIndex job={dashboardData?.data?.ongoingJobs} />
        </div>
        <PageAside>
          <UpcomingTrainings events={dashboardData?.data?.fixSchedule} />
        </PageAside>
      </PageContainer>

      <UnassignedHome data={dashboardData?.data} />

      <SupplyIndex data={dashboardData?.data} />
    </>
  );
};

export default DasboardContent;
