import React from "react";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import { Chip, Stack } from "@mui/material";
import { format } from "date-fns";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../globalcomponents/GlobalTable";

const WithdrawalsTable = ({
  withdrawalReqs = [],
  isLoading,
  openRejectModal,
  openAcceptModal,
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
      name: "fullName",
      label: "Name",
    },
    {
      name: "bankName",
      label: "Bank Name",
    },
    {
      name: "accountNumber",
      label: "Account Number",
    },
    {
      name: "amount",
      label: "Amount",
      options: {
        customBodyRender: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={
              value.toLowerCase() === "active"
                ? "success"
                : value.toLowerCase() === "pending"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },
    {
      name: "createdAt",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "withDrawId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Confirm Withdrawal",
              action: () => openAcceptModal(value),
            },
            {
              id: 1,
              name: "Deny Withdrawal",
              action: () => openRejectModal(value),
            },
          ];
          return (
            <GlobalTableActions actions={actions} id="wallet-withdrawal" />
          );
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && withdrawalReqs?.length > 0 && (
        <GlobalTable columns={newColumns} data={withdrawalReqs} />
      )}

      {!isLoading && withdrawalReqs?.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          <p className="fs-5 text-center">No record found</p>
        </Stack>
      )}
    </>
  );
};

export default WithdrawalsTable;
