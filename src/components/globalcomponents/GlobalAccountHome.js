import { useState } from "react";
import {
  PageContainer,
  PageAside,
} from "../layouts/dashboard/DashboardUtilities";
import { format } from "date-fns";
import GlobalTable from "./GlobalTable";
import DashboardTargets from "./DashboardTargets";
import { useGetAmountEarning } from "../../hooks/useQueries/useJobs";
import DashboardAccountSummary from "./GlobalDashboardAccountSummary";
import GlobalBallBeat from "./GlobalBallBeat";
import { useOutletContext } from "react-router-dom";
import WithdrawFund from "../../pages/qamaster/wallet/WithdrawFund";
import useDateFilter from "../../hooks/useDateFilter";
import useDateQueries from "../../hooks/useDateQueries";
import DateFilterToolbar from "./DateFilterToolbar";

const GlobalAccountHome = ({ collaborator = false }) => {
  const { dashboardData } = useOutletContext();

  const [openWithdrawalWallet, setOpenWithdrawalWallet] = useState(false);

  const closeModalHandler = () => setOpenWithdrawalWallet(false);

  const { data: accountData, isLoading } = useGetAmountEarning();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateCreated",
    accountData?.data?.earnings
  );

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
      name: "amountDue",
      label: "Total Amount",
    },
  ];
  return (
    <>
      <PageContainer>
        <div className="mb-4">
          <DashboardAccountSummary
            data={dashboardData}
            accountData={accountData?.data}
            accountSummary={true}
          />

          {/* <AccountCard data={dashboardData?.data} /> */}
        </div>
        {collaborator ? null : (
          <PageAside>
            <DashboardTargets dashBoardData={dashboardData} />
          </PageAside>
        )}
      </PageContainer>

      <div className="text-center">
        <GlobalBallBeat loading={isLoading} />
      </div>

      <GlobalTable
        columns={columns}
        data={filteredResults}
        options={{
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />

      {openWithdrawalWallet && (
        <WithdrawFund
          isOpen={openWithdrawalWallet}
          closeModal={closeModalHandler}
        />
      )}
    </>
  );
};

export default GlobalAccountHome;
