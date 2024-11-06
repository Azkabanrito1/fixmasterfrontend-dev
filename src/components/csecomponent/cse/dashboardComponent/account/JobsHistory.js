import { BackBtn, PageHeading } from "../../../../globalcomponents/Utilities";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import { format } from "date-fns";

const JobsHistory = () => {
  const columns = [
    {
      name: "s/name",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },

    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "jobCategory",
      label: "Job Category",
    },

    {
      name: "jobType",
      label: "Job Type",
    },

    {
      name: "amount",
      label: "Amount",
    },
  ];

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Jobs Earnings History</PageHeading>
      </div>
      <GlobalTable columns={columns} data={[]} />
    </>
  );
};

export default JobsHistory;
