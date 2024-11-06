import { Stack } from "@mui/material";
import DashboardAccountSummary from "../../../../components/globalcomponents/GlobalDashboardAccountSummary";
import { AssignmentContainer } from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import OnboardingTable from "../../../../components/hrcomponents/dashboard/OnboardingTable";
import UsersManaged from "../../../../components/hrcomponents/dashboard/UsersManaged";
import ReferralsSection from "../../../../components/hrcomponents/dashboard/ReferralsSection";
import CommentToMgmt from "../../../../components/hrcomponents/dashboard/CommentToMgmt";
import CseAdminDashboardUserTable from "./CseAdminDashboardTable";
import CseManagedCard from "./CseManagedCard";


const CseAdminHome = ({ dashboardData }) => {
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
            <CseAdminDashboardUserTable />
            {/* <OnboardingTable data={dashboardData?.collaboratorsApplications} /> */}
          </AssignmentContainer>
        </Stack>
        <Stack spacing={3.4}>
          <ReferralsSection dashboardData={dashboardData} />
          <CseManagedCard collaborator={`cse`} />
          {/* <UsersManaged data={dashboardData} /> */}
        </Stack>
      </Stack>
      <CommentToMgmt rowNumber={5} dashboard={true} />
    </>
  );
};
export default CseAdminHome;
