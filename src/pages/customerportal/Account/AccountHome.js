import { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import AccountStats from "../../../components/customercomponents/account/AccountStats";
import PromoBanner from "../../../components/customercomponents/dashboardcomponents/PromoBanner";
import DashboardAccountSummary from "../../../components/globalcomponents/GlobalDashboardAccountSummary";
import FundWallet from "../../../components/customercomponents/modals/FundWallet";
import { useGetAmountEarning } from "../../../hooks/useQueries/useJobs";
import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";

const AccountHome = () => {
  const [showFundWallet, setShowFundWallet] = useState(false);
  const { dashboardData } = useOutletContext();

  const openFundWallet = () => setShowFundWallet(true);

  const { data: accountData, isLoading } = useGetAmountEarning();

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "fixId",
      label: "Job ID",
    },
    {
      name: "dateCreated",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },

    {
      name: "transactionDesc",
      label: "Transaction Descriptions",
    },
    {
      name: "fixLabourCost",
      label: "Labour Cost",
    },
    {
      name: "amountDue",
      label: "Total Amount",
    },
  ];
  return (
    <div>
      <AccountPageContainer>
        <div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <DashboardAccountSummary
              data={dashboardData}
              openFundWallet={openFundWallet}
              accountData={accountData?.data}
              customAccountSummary={true}
            />
          </div>
        </div>
        <PageAside>
          {dashboardData?.promoBanner && (
            <PromoBanner banner={dashboardData?.promoBanner} height="100%" />
          )}
        </PageAside>
      </AccountPageContainer>
      <GlobalBallBeat loading={isLoading} />

      {/* <AccountHomeTable transactionHistory={[]} /> */}
      <GlobalTable data={accountData?.data?.earnings} columns={columns} />

      {showFundWallet && (
        <FundWallet
          isOpen={showFundWallet}
          closeModal={() => setShowFundWallet(false)}
        />
      )}
    </div>
  );
};

export default AccountHome;

const AccountPageContainer = styled(PageContainer)`
  grid-auto-rows: 1fr;
  margin-bottom: 2rem;
`;
