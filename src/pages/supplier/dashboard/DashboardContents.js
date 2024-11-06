import DashboardAccountSummary from "../../../components/globalcomponents/GlobalDashboardAccountSummary";
import { PageContainer } from "../../../components/layouts/dashboard/DashboardUtilities";
import Order from "../../../components/suppliercomponent/dashboardcomponent/Order";
import SupplierCard from "../../../components/suppliercomponent/dashboardcomponent/SupplierCard";
import TotalSupply from "../../../components/suppliercomponent/dashboardcomponent/TotalSupply";
import { useGetUserDashboard } from "../../../hooks/useQueries/useIdentity";

const DashboardContents = () => {
  const { data: dashboardData, isLoading } = useGetUserDashboard();
  return (
    <div>
      <PageContainer className="mb-4">
        <DashboardAccountSummary
          data={dashboardData?.data}
          supplier={true}
          dashboardSummary={true}
        />
        <SupplierCard data={dashboardData?.data} />
      </PageContainer>
      <Order
        fullfiled={dashboardData?.data?.fullfiledOrders}
        newSpareRequests={dashboardData?.data?.submittedQuotes}
        scheduledDeliveries={dashboardData?.data?.scheduledDeliveries}
        isLoading={isLoading}
      />
      <TotalSupply
        supplyMetricsForGraph={dashboardData?.data?.supplyMetricsForGraph}
      />
    </div>
  );
};

export default DashboardContents;
