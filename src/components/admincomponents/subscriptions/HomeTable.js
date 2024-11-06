import { useNavigate } from "react-router";
import { PATH_ADMIN } from "../../../routes/paths";
import { Chip } from "@mui/material";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const HomeTable = ({
  subscriptions,
  isLoading,
  deactivateSub,
  isSuperAdmin,
}) => {
  const navigate = useNavigate();

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
    { name: "longName", label: "Name" },
    { name: "customerType", label: "Customer Type" },
    {
      name: "subscriptionStatus",
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
        customBodyRender: (value) => {
          const actions = [
            ...(isSuperAdmin
              ? [
                  {
                    id: 0,
                    name: "Edit/View Subscription Configuration",
                    action: () => navigate(`${PATH_ADMIN.subDetails}/${value}`),
                    disabled: false,
                  },
                ]
              : []),
            {
              id: 1,
              name: "View Subscribers",
              action: () => navigate(`${PATH_ADMIN.viewSubscribers}/${value}`),
              disabled: false,
            },
            ...(isSuperAdmin
              ? [
                  {
                    id: 2,
                    name: "Deactivate Subscription",
                    action: () => deactivateSub(value),
                    disabled: true,
                  },
                ]
              : []),
          ];
          return <GlobalTableActions actions={actions} id="discount" />;
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={subscriptions}
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

export default HomeTable;
