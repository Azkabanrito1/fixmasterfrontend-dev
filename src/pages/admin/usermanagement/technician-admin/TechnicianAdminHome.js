import { Stack } from "@mui/material";
import DashboardAccountSummary from "../../../../components/globalcomponents/GlobalDashboardAccountSummary";
import { AssignmentContainer } from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import OnboardingTable from "../../../../components/hrcomponents/dashboard/OnboardingTable";
import UsersManaged from "../../../../components/hrcomponents/dashboard/UsersManaged";
import ReferralsSection from "../../../../components/hrcomponents/dashboard/ReferralsSection";
import CommentToMgmt from "../../../../components/hrcomponents/dashboard/CommentToMgmt";
import TechnicianManagedCard from "./TechnicianManagedCard";
import TechAdminDashboardUserTable from "./TechAdminDashboardTable";


const TechnicianAdminHome = ({ dashboardData }) => {
  return (
    <>
      <Stack
        direction={{ lg: "row", xs: "column" }}
        spacing={2}
        marginBottom={3}
      >
        <Stack spacing={2} flexGrow={1}>
          <DashboardAccountSummary data={dashboardData} />
          <AssignmentContainer>
            <TechAdminDashboardUserTable />
            {/* <OnboardingTable data={dashboardData?.collaboratorsApplications} /> */}
          </AssignmentContainer>
        </Stack>
        <Stack spacing={3.4}>
          <ReferralsSection dashboardData={dashboardData} />
          <TechnicianManagedCard collaborator={`technician`} />
          {/* <UsersManaged data={dashboardData} /> */}
        </Stack>
      </Stack>
      <CommentToMgmt rowNumber={5} dashboard={true} />
    </>
  );
};
export default TechnicianAdminHome;
