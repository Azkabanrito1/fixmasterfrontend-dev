import { PATH_ADMIN } from "../../../routes/paths";
import { useNavigate } from "react-router";
import { Chip, Stack } from "@mui/material";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { useActivateDeactivateTerritory } from "../../../hooks/useQueries/useAdmin";

const TerritoryTable = ({ territories, isLoading }) => {
  const navigate = useNavigate();
  const { mutate: activateDeactivate } = useActivateDeactivateTerritory();

  const columns = [
    { name: "sn", label: "S/N" },
    { name: "territoryName", label: "Name" },
    {
      name: "dateCreated",
      label: "Created At",
    },
    {
      name: "managerName",
      label: "Managed By",
      options: {
        customBodyRender: (value) => (value !== "  " ? value : "N/A"),
      },
    },
    {
      name: "territoryStatus",
      label: "Status",
      options: {
        sort: false,
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value?.toLowerCase() === "active" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "territoryId",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, row) => {
          const actions = [
            {
              id: 0,
              name: "View Territory Info",
              action: () => navigate(`${PATH_ADMIN.territoryInfo}/${value}`),
            },
            {
              id: 1,
              name: "Edit Territory Details",
              action: () => navigate(`${PATH_ADMIN.editTerritory}/${value}`),
            },
            {
              id: 2,
              name: "Edit Collaborator Settings",
              action: () => navigate(`${PATH_ADMIN.territoryCollabs}/${value}`),
            },
            {
              id: 3,
              name: "Edit Rate Uplifts",
              action: () => navigate(`${PATH_ADMIN.uplifts}/${value}`),
            },
            {
              id: 3,
              name: "Deactivate",
              action: () =>
                activateDeactivate({
                  territoryId: value,
                  action: "deactivate",
                }),
              disabled: true,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="territory" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && territories?.length > 0 && (
        <GlobalTable
          columns={columns}
          data={territories}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            pagination: false,
            displayToolbar: false,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}

      {!isLoading && territories?.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          <p className="fs-5 text-center">No territories configured</p>
        </Stack>
      )}
    </>
  );
};

export default TerritoryTable;
