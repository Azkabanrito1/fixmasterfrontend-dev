import { StyledAccount } from "./Utilities";
import DashboardAccountStats from "../dashboardcomponents/dashboardaccountinfo/DashboardAccountStats";
import DashboardProfile from "../dashboardcomponents/dashboardaccountinfo/DashboardProfile";
import DashboardWalletSummary from "../dashboardcomponents/dashboardaccountinfo/DashboardWalletSummary";

const DashboardAccountSummary = ({
  data,
  openFundWallet,
  supplier,
  accountData,
  dashboardSummary,
  accountSummary,
  customAccountSummary,
}) => {
  return (
    <StyledAccount>
      <div>
        <DashboardProfile profileData={data} />
        <DashboardAccountStats accountData={data} supplier={supplier} />
      </div>

      <DashboardWalletSummary
        accountData={data}
        openFundWallet={openFundWallet}
        accountBalance={accountData?.summary}
        dashboardSummary={dashboardSummary}
        accountSummary={accountSummary}
        customAccountSummary={customAccountSummary}
      />
    </StyledAccount>
  );
};

export default DashboardAccountSummary;
