import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import { format } from "date-fns";

const ClosedFixTable = ({ data, showJobModal }) => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "scheduleDate", data);

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "fixNumber",
      label: "Fix ID",
      options: {
        customBodyRender: (value) => value?.split("-")[1],
      },
    },
    {
      name: "scheduleDate",
      label: "Requested Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "addressDetails",
      label: "Fix Address",
      options: {
        customBodyRender: (value) => value.address,
      },
    },
    {
      name: "fixStatus",
      label: "Fix Status",
    },
    {
      name: "fixId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const action = [
            {
              id: 0,
              name: "View Job Details",
              action: () => showJobModal(value),
            },
          ];

          return <GlobalTableActions actions={action} id="closed-jobs" />;
        },
      },
    },
  ];

  return (
    <GlobalTable
      data={filteredResults}
      columns={columns}
      options={{
        customToolbar: () => (
          <DateFilterToolbar
            dateQueries={dateQueries}
            setDateQueries={setDateQueries}
          />
        ),
      }}
    />
  );
};

export default ClosedFixTable;
