import { PageHeading } from "../Utilities";
import FilteredRef from "../../qamastercomponent/referral/FiteredRef";
import GlobalTable from "../GlobalTable";
import { useGetReferral } from "../../../hooks/useQueries/useIdentity";
import GlobalBallBeat from "../GlobalBallBeat";
import { format } from "date-fns";
import useDateQueries from "../../../hooks/useDateQueries";
import useDateFilter from "../../../hooks/useDateFilter";
import DateFilterToolbar from "../DateFilterToolbar";

const CollaboratorReferral = () => {
  const { data: referralData, isLoading } = useGetReferral();

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "createdAt",
    referralData?.data?.referralDetails
  );

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: { customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1 },
    },
    {
      name: "fullName",
      label: "Name",
    },
    {
      name: "referralType",
      label: "Referral Type",
    },
    {
      name: "amountEarned",
      label: "Amount Earned",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      name: "createdAt",
      label: "Date Registered",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
  ];

  const totalAmountEarned = referralData?.data?.referralDetails?.reduce(
    (acc, curr) => {
      acc += curr.amountEarned;
      return acc;
    },
    0
  );

  return (
    <>
      <PageHeading>Referrals</PageHeading>
      <GlobalBallBeat loading={isLoading} />
      <div className="d-grid align-items-center justify-content-center">
        <img
          src="/images/sendPlane.svg"
          alt="referrals"
          style={{ margin: "auto" }}
        />
        <h2 className=" text-center " style={{ fontWeight: "bold" }}>
          Refer A Friend, Get A Reward
        </h2>
        <p className="fs-5 text-center">
          Refer your friends and family using your referral link or code to get
          a 5% bonus from their first booking
        </p>
        <h4 className="text-center mt-3">
          Total Referral Income:{" "}
          <span>{totalAmountEarned?.toLocaleString("en-US")}</span>
        </h4>
      </div>
      <FilteredRef referralCodeData={referralData?.data} />
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
    </>
  );
};

export default CollaboratorReferral;
