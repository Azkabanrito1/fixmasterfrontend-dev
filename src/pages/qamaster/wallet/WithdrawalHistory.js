import { BackBtn } from "../../../components/globalcomponents/Utilities";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const WithdrawalHistory = () => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "date", []);

  const columns = [
    {
      name: "s/name",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },
    {
      name: "title",
      label: "Title",
    },

    {
      name: "description",
      label: "Description",
    },

    {
      name: "amountEarned",
      label: "Amount Earned",
    },

    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Earnings History</PageHeading>
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
    </>
  );
};

export default WithdrawalHistory;
