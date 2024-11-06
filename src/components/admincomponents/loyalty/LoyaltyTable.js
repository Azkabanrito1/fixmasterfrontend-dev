import { Chip } from "@mui/material";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const LoyaltyTable = ({ loyalties, isLoading }) => {
  const columns = [
    { name: "loyaltyName", label: "Name" },
    { name: "loyaltyType", label: "Type" },
    {
      name: "minimumSpending",
      label: "Min Spend",
      options: {
        customBodyRenderLite: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "maximumSpending",
      label: "Max Spend",
      options: {
        customBodyRenderLite: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "loyaltyStatus",
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
      name: "loyaltyId",

      label: "Actions",
      width: 80,
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View Info",
              action: () => {
                console.log(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="loyalty" />;
        },
      },
    },
  ];

  return (
    <>
      {isLoading && <GlobalBallBeat loading={isLoading} />}

      {!isLoading && (
        <GlobalTable
          data={loyalties}
          columns={columns}
          options={{
            elevation: 0,
            filter: true,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
    </>
  );
};

export default LoyaltyTable;
