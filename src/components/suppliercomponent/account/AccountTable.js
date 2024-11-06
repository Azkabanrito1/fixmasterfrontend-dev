import React from "react";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { format } from "date-fns";

const AccountTable = () => {
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: (_, tableMeta) => tableMeta.rowIndex + 1,
    },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "incomeType",
      label: "Income Type",
    },
    {
      name: "amount",
      label: "Amount",
    },
    {
      name: "accountId",
      label: "---",
    },
  ];
  return <GlobalTable columns={columns} data={[]} />;
};

export default AccountTable;
