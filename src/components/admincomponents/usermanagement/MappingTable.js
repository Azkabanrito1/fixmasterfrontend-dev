import { format } from "date-fns";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import GlobalTable from "../../globalcomponents/GlobalTable";

const MappingTable = ({ data }) => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "dateMatched", data);
  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "technicianName",
      label: "Technician Name",
    },
    {
      name: "qaName",
      label: "QA Name",
      options: {
        customBodyRender: (value) => value || "N/A",
      },
    },
    {
      name: "qaEmail",
      label: "QA Email",
      options: {
        customBodyRender: (value) => value || "N/A",
      },
    },
    {
      name: "dateMatched",
      label: "Date Matched",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "status",
      label: "Status",
    },
  ];

  return (
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
  );
};

export default MappingTable;
