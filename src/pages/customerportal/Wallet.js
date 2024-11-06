import { useOutletContext } from "react-router-dom";
import WalletSummary from "../../components/customercomponents/wallet/WalletSummary";
import {
  PageAside,
  PageContainer,
} from "../../components/layouts/dashboard/DashboardUtilities";
import PromoBanner from "../../components/customercomponents/dashboardcomponents/PromoBanner";
import styled from "styled-components";
import CustomerWalletTable from "../../components/customercomponents/wallet/WalletTable";
import { useState } from "react";
import FundWallet from "../../components/customercomponents/modals/FundWallet";

const CustomerWallet = () => {
  const [showFundWallet, setShowFundWallet] = useState(false);
  const { dashboardData } = useOutletContext();

  const openFundWallet = () => setShowFundWallet(true);

  return (
    <div>
      <AccountPageContainer>
        <WalletSummary data={dashboardData} openFundWallet={openFundWallet} />
        {dashboardData?.promoBanner && (
          <PageAside>
            <PromoBanner banner={dashboardData?.promoBanner} height="100%" />
          </PageAside>
        )}
      </AccountPageContainer>

      <CustomerWalletTable />

      {showFundWallet && (
        <FundWallet
          isOpen={showFundWallet}
          closeModal={() => setShowFundWallet(false)}
        />
      )}
    </div>
  );
};

export default CustomerWallet;

const AccountPageContainer = styled(PageContainer)`
  grid-auto-rows: 1fr;
  margin-bottom: 2rem;
`;
