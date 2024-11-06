import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../DateFilterToolbar";
import GlobalTable from "../GlobalTable";
import { BackBtn } from "../Utilities";
import { PageHeading } from "../Utilities";

const WalletReferral = () => {
  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(dateQueries, "dateRegistered", []);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },

    {
      name: "userName",
      label: "Username",
    },

    {
      name: "dateRegistered",
      label: "Date Registered",
    },

    {
      name: "amountEarned",
      label: "Amount Earned",
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Referral Earnings</PageHeading>
      </div>
      <GlobalTable
        columns={columns}
        data={filteredResults}
        options={{
          customToolbar: () => (
            <DateFilterToolbar
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />
      {/* <div
        className="d-flex justify-content-between"
        style={{ backgroundColor: "var(--clr-primary)" }}
      >
        <p className="fs-4 text-light mt-2 p-2">Total</p>
        <span className="fs-4 text-light mt-2 p-2">NGN</span>
      </div> */}
    </>
  );
};

export default WalletReferral;
