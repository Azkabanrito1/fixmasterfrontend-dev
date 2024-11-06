import React from "react";
import CseWalletCard from "../../../components/csecomponent/cse/wallet/CseWalletCard";
import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useGetWalletTransactions } from "../../../hooks/useQueries/useJobs";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const WalletIndex = () => {
  const { data: walletTransactionsData } = useGetWalletTransactions();
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "transactionDate",
    walletTransactionsData?.data?.walletTransactions
  );

  const walletTransactions = walletTransactionsData?.data?.walletTransactions;

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "transactionDate",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "transactionType",
      label: "Type",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "amount",
      label: "Amount",
    },
  ];
  return (
    <>
      <CseWalletCard />
      <GlobalTable
        columns={columns}
        data={filteredResults}
        options={{
          rowsPerPageOptions: [5, 10, 20, 50],
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />
    </>
  );
};

export default WalletIndex;
