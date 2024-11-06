import { Stack } from "@mui/material";
import UsersSection from "../../components/admincomponents/dashboard/UsersSection";
import TerritorySection from "../../components/admincomponents/dashboard/TerritorySection";
import { useOutletContext } from "react-router-dom";
import JobsSection from "../../components/admincomponents/dashboard/JobsSection";
import RevenueSection from "../../components/admincomponents/dashboard/RevenueSection";

const AdminHome = () => {
  const { dashboardData, loadingDashboardData } = useOutletContext();

  const territoryData = dashboardData?.territories?.map((territory, index) => ({
    ...territory,
    sn: index + 1,
  }));

  return (
    <Stack spacing={4}>
      <UsersSection data={dashboardData?.userCategories} />
      <TerritorySection data={territoryData || []} />
      <JobsSection data={dashboardData} />
      <RevenueSection
        data={dashboardData?.revenueMetrics}
        isLoading={loadingDashboardData}
      />
    </Stack>
  );
};

export default AdminHome;
