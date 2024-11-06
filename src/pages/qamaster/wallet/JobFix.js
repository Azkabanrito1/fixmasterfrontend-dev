import { BackBtn } from "../../../components/globalcomponents/Utilities";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { format } from "date-fns";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const JobFix = () => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "date", []);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },
    {
      name: "jobRef",
      label: "Job Ref",
    },
    {
      name: "jobClass",
      label: "Job Class",
    },
    {
      name: "amount",
      label: "Amount",
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
        <PageHeading>Job Fix Earnings</PageHeading>
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

export default JobFix;
