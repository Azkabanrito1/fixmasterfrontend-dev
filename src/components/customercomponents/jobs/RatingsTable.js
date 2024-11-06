import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";

const RatingsTable = ({ data, showRatingModal }) => {
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
      name: "fixId",
      label: "Fix ID",
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
      label: "Rating Stage",
    },
    {
      name: "fixId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const action = [
            {
              id: 0,
              name: "Give Rating",
              action: () => showRatingModal(value),
            },
          ];

          return <GlobalTableActions actions={action} id="ongoing-jobs" />;
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

export default RatingsTable;
