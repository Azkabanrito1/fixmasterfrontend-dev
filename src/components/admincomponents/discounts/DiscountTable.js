import { Chip, Stack } from "@mui/material";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { format } from "date-fns";

const DiscountTable = ({
  discounts = [],
  isLoading,
  editDiscount,
  deactivateDiscount,
}) => {
  const newColumns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "discountName",
      label: "Name",
    },
    {
      name: "computeType",
      label: "Value Type",
    },
    {
      name: "discountValue",
      label: "Value",
      options: {
        customBodyRender: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "discountStatus",
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
      name: "dateCreated",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "discountId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Edit Discount",
              action: () => editDiscount(value),
              disabled: false,
            },
            {
              id: 1,
              name: "Deactivate Discount",
              action: () => deactivateDiscount(value),
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="discount" />;
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && discounts?.length > 0 && (
        <GlobalTable columns={newColumns} data={discounts} />
      )}

      {!isLoading && discounts?.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          <p className="fs-5 text-center">No discounts configured</p>
        </Stack>
      )}
    </>
  );
};

export default DiscountTable;
