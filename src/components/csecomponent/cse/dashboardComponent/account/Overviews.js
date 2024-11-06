import { BackBtn, PageHeading } from "../../../../globalcomponents/Utilities";
import { format } from "date-fns";
import GlobalTable from "../../../../globalcomponents/GlobalTable";

const Overviews = () => {
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
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
      label: "-----",
    },
  ];

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Accounts</PageHeading>
      </div>

      <div className="text-center">
        {/* <BallBeat loading={isLoading} color="var(--clr-primary)" /> */}
      </div>
      <GlobalTable columns={columns} data={[]} />
    </>
  );
};

export default Overviews;
