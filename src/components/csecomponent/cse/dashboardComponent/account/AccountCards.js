import CseAccountStat from "../dasboard/CseAcountStat";
import { JobContainer } from "../../../../../pages/franchisee/dashboard/JobManagement";

const AccountCards = () => {
  const accountSummary = {
    jobs: {
      totalWeek: 1,
      totalMonth: 3,
      totalYear: 15,
    },
    referral: {
      totalWeek: "1,000",
      totalMonth: "3,850",
      totalYear: "32,599",
    },
    retention: {
      totalWeek: "1,000",
      totalMonth: "3,850",
      totalYear: "32,599",
    },
    withdraw: {
      totalWeek: "1,000",
      totalMonth: "3,850",
      totalYear: "32,599",
    },
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
      title: "Jobs",
      text: "Total Earned",
      img: "/images/line-graph.png",
      ref: "job-history",
      linkText: "View Jobs History",
      color: "#006717",
      values: accountSummary?.jobs,
      filters: [{ type: "time", details: timeFilters }],
    },
    Overview: {
      title: "Overview",
      text: "Total Earned",
      img: "/images/arrowdown.jpeg",
      ref: "history",
      linkText: "View Earnings History",
      color: "#fcded1",
      values: accountSummary?.Overview,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <CseAccountStat
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

export default AccountCards;
