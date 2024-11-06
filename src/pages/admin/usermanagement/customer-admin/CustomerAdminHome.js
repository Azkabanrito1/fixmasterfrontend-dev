import { Stack } from "@mui/material";
import { AssignmentContainer } from "../../../../components/franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import DashboardAccountSummary from "../../../../components/globalcomponents/GlobalDashboardAccountSummary";
import CommentToMgmt from "../../../../components/hrcomponents/dashboard/CommentToMgmt";
import OnboardingTable from "../../../../components/hrcomponents/dashboard/OnboardingTable";
import ReferralsSection from "../../../../components/hrcomponents/dashboard/ReferralsSection";
import UsersManaged from "../../../../components/hrcomponents/dashboard/UsersManaged";
import { useOutletContext } from "react-router-dom";
import CustomerAdminDashboardUserTable from "./CustomerTable";
import CustomersManaged from "./CustomersManaged";

const CustomerAdminHome = () => {
  const { dashboardData } = useOutletContext();
  return (
    <>
      <Stack
        direction={{ lg: "row", xs: "column" }}
        spacing={2}
        // justifyContent={"space-between"}
        marginBottom={3}
      >
        <Stack spacing={2} flexGrow={1}>
          <DashboardAccountSummary data={dashboardData} />
          <AssignmentContainer>
            <CustomerAdminDashboardUserTable />
            {/* <OnboardingTable data={dashboardData?.collaboratorsApplications} /> */}
          </AssignmentContainer>
        </Stack>
        <Stack spacing={3.4}>
          <ReferralsSection dashboardData={dashboardData} />
          <CustomersManaged/>
          {/* <UsersManaged data={dashboardData} /> */}
        </Stack>
      </Stack>
      <CommentToMgmt rowNumber={5} dashboard={true} />
    </>
  );
};
export default CustomerAdminHome;
