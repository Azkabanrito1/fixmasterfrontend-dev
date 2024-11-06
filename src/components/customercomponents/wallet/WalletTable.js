import { format } from "date-fns";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { useGetWalletTransactions } from "../../../hooks/useQueries/useJobs";

const CustomerWalletTable = () => {
  const { data: walletTransactionsData } = useGetWalletTransactions();

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
      name: "amount",
      label: "Amount",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "transactionType",
      label: "Type",
    },
    {
      name: "transactionDate",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
  ];

  return <GlobalTable columns={columns} data={walletTransactions} />;
};

export default CustomerWalletTable;
