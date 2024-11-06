import { Chip, Stack } from "@mui/material";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { useGetUsersByCategory } from "../../../hooks/useQueries/useIdentity";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const AdminManagedTable = ({
  collaborator,
  suspendUser,
  unSuspendUser,
  deactivateUser,
}) => {
  const { data: usersData, isLoading } = useGetUsersByCategory(
    collaborator.toLowerCase()
  );

  const collaboratorData = usersData || [];
  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        customBodyRender: (_value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "Name",
      options: {
        customBodyRender: (_value, tableMeta) => {
          return `${collaboratorData[tableMeta.rowIndex].firstName} ${
            collaboratorData[tableMeta.rowIndex].lastName
          }`;
        },
      },
    },
    { name: "email", label: "Email" },
    { name: "phoneNumber", label: "Phone Number" },
    {
      name: "accountStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value.toLowerCase() === "active" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const status =
            collaboratorData[tableMeta.rowIndex].accountStatus.toLowerCase();

          const actions = [
            {
              id: 0,
              name: "View Analysis Report",
              disabled: true,
              action: () => {},
            },
            {
              id: 1,
              name: status === "active" ? "Suspend" : "Unsuspend",
              action:
                status === "active"
                  ? () => suspendUser(value)
                  : () => unSuspendUser(value),
            },
            {
              id: 2,
              name: "Deactivate",
              disabled: true,
              action: () => {},
            },
          ];
          return <GlobalTableActions actions={actions} id="discount" />;
        },
      },
    },
  ];

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={collaboratorData}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
    </div>
  );
};

export default AdminManagedTable;
