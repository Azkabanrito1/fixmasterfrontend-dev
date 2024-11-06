import { JobContainer } from "../../../pages/franchisee/dashboard/JobManagement";
import AccountStatCard from "./AccountStatCard";

const AccountStats = ({ data }) => {
  const jobsSummary = {
    totalWeek: data.jobsSummary?.weekTotal,
    totalMonth: data.jobsSummary?.monthTotal,
    totalYear: data.jobsSummary?.yearTotal,
  };

  const transactionSummary = {
    totalWeek: data.transactionSummary?.totalWeekSpendings,
    totalMonth: data.transactionSummary?.totalMonthSpendings,
    totalYear: data.transactionSummary?.totalYearSpendings,
  };

  const timeFilters = [
    {
      id: 1,
      name: "This Week",
      key: "totalWeek",
    },
    {
      id: 2,
      name: "This Month",
      key: "totalMonth",
    },
    {
      id: 3,
      name: "This Year",
      key: "totalYear",
    },
  ];

  const accountStatus = {
    jobs: {
      title: "Fixes",
      text: "Total bookings",
      img: "/images/line-graph.png",
      ref: "booking-history",
      linkText: "View Booking History",
      color: "#006717",
      values: jobsSummary,
      filters: [{ type: "time", details: timeFilters }],
    },
    unassigned: {
      title: "Overview",
      text: "Total Spent",
      img: "/images/arrSide.svg",
      ref: "transaction-history",
      linkText: "View Transaction History",
      color: "var(--clr-primary)",
      values: transactionSummary,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <AccountStatCard
        key={accountStatus[status].title}
        title={accountStatus[status].title}
        text={accountStatus[status].text}
        img={accountStatus[status].img}
        color={accountStatus[status].color}
        filters={accountStatus[status].filters}
        values={accountStatus[status].values}
        link={accountStatus[status].ref}
        linkText={accountStatus[status].linkText}
      />
    );
  });

  return <JobContainer>{statsTemplate}</JobContainer>;
};

export default AccountStats;
