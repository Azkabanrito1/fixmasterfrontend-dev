import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const ViewSubscribersTable = ({ subscription, isLoading, deactivateSub }) => {
  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        customBodyRender: (_value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    { name: "name", label: "Name" },
    { name: "territory", label: "Territory" },
    { name: "lga", label: "LGA" },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
    { name: "country", label: "Country" },
    { name: "subScriptionStartDate", label: "Start Date" },
    { name: "subScriptionEndDate", label: "End Date" },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={subscription}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
    </>
  );
};

export default ViewSubscribersTable;
