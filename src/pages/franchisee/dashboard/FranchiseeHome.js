import UrgentAssignments from "../../../components/franchiseecomponents/dashboardcomponents/UrgentAssignments";
import HireRequests from "../../../components/franchiseecomponents/dashboardcomponents/HireRequests";
import UpcomingTrainings from "../../../components/globalcomponents/UpcomingEvents";
import TerritoryHealth from "../../../components/franchiseecomponents/dashboardcomponents/TerritoryHealth";
import RejectedJobs from "../../../components/franchiseecomponents/dashboardcomponents/RejectedJobs";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import { useGetUserDashboard } from "../../../hooks/useQueries/useIdentity";

const FranchiseeHome = () => {
  const { data: dashboardData, isLoading } = useGetUserDashboard();
  const collaboratorRole = JSON.parse(localStorage.getItem("loginDetails"));

  return (
    <PageContainer>
      <div>
        <TerritoryHealth
          dashboardData={dashboardData?.data}
          collaboratorRole={collaboratorRole?.role}
        />
        <UrgentAssignments
          assignments={dashboardData?.data?.territoryUrgentJobs}
        />
        <RejectedJobs
          rejectedJobs={dashboardData?.data?.territoryCanceledJobs}
        />
        <HireRequests
          equipmentRequests={dashboardData?.data?.territoryEquipmentRequests}
          isLoading={isLoading}
        />
      </div>
      <PageAside>
        <UpcomingTrainings />
      </PageAside>
    </PageContainer>
  );
};

export default FranchiseeHome;
