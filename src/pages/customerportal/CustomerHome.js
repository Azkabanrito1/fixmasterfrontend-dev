import {
  PageAside,
  PageContainer,
} from "../../components/layouts/dashboard/DashboardUtilities";
import FixCards from "../../components/customercomponents/fix/FixCards";
import SubscribeNow from "../../components/customercomponents/dashboardcomponents/SubscribeNow";
import PromoBanner from "../../components/customercomponents/dashboardcomponents/PromoBanner";
import { useOutletContext } from "react-router-dom";
import DashboardAccountSummary from "../../components/globalcomponents/GlobalDashboardAccountSummary";
import UpcomingEvents from "../../components/globalcomponents/UpcomingEvents";
import { useState } from "react";
import FundWallet from "../../components/customercomponents/modals/FundWallet";

const DashboardHome = () => {
  const [showFundWallet, setShowFundWallet] = useState(false);
  const { dashboardData } = useOutletContext();

  const openFundWallet = () => setShowFundWallet(true);

  return (
    <PageContainer>
      <div>
        <DashboardAccountSummary
          data={dashboardData}
          openFundWallet={openFundWallet}
        />
        <FixCards fixData={dashboardData} />
        {!dashboardData?.accountSubScription?.length && <SubscribeNow />}
        {dashboardData?.promoBanner && (
          <PromoBanner banner={dashboardData?.promoBanner} />
        )}
      </div>
      <PageAside>
        <UpcomingEvents
          events={dashboardData?.fixSchedule}
          title={"Upcoming Jobs"}
        />
      </PageAside>

      {showFundWallet && (
        <FundWallet
          isOpen={showFundWallet}
          closeModal={() => setShowFundWallet(false)}
        />
      )}
    </PageContainer>
  );
};

export default DashboardHome;
