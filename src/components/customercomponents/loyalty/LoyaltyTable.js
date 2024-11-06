import GlobalTable from "../../globalcomponents/GlobalTable";

const CustomerLoyaltyTable = ({ data = [] }) => {
  const columns = [
    { name: "id", label: "Job ID" },
    { name: "description", label: "Description" },
    { name: "cost", label: "Job Cost" },
    { name: "amountEarned", label: "Amount Earned" },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
  ];

  return <GlobalTable data={data} columns={columns} />;
};

export default CustomerLoyaltyTable;
