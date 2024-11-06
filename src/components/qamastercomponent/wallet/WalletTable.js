import useDateQueries from "../../../hooks/useDateQueries";
import useJobSearch from "../../../hooks/useJobSearch";
import JobFilters from "../../franchiseecomponents/jobsmanagement/JobFilters";
import { AssignmentHeader } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { format } from "date-fns";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { useGetWalletTransactions } from "../../../hooks/useQueries/useJobs";

const WalletTable = () => {
  const { dateQueries, setDateQueries } = useDateQueries();

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
  const {
    filteredResults,
    filterClass,
    options,
    presentFilter,
    setPresentFilter,
    setFilterClass,
  } = useJobSearch(columns);

  return (
    <>
      <div className="mt-4">
        <AssignmentHeader>
          <h2>Latest Activities</h2>
        </AssignmentHeader>
      </div>
      <JobFilters
        dateQueries={dateQueries}
        filterClass={filterClass}
        options={options}
        presentFilter={presentFilter}
        setDateQueries={setDateQueries}
        setFilterClass={setFilterClass}
        setPresentFilter={setPresentFilter}
        title="Select"
      />
      <GlobalTable columns={columns} data={walletTransactions} />
    </>
  );
};

export default WalletTable;
