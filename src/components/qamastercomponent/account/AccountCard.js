import TechAccountStat from "../account/TechAccountStat";
import { JobContainer } from "../../../pages/franchisee/dashboard/JobManagement";

const AccountCard = ({ data }) => {
  const accountSummary = {
    jobs: {
      totalDaily: data?.dailyJobEarnings,
      totalWeek: data?.weeklyJobEarnings,
      totalMonth: data?.monthlyJobEarnings,
      totalYear: data?.yearlyJobEarnings,
    },
    overview: {
      totalWeek: 0,
      totalMonth: 0,
      totalYear: 0,
    },
  };

  const timeFilters = [
    {
      id: 0,
      name: "This Day",
      key: "totalDay",
    },
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
      text: "Total Jobs done",
      img: "/images/line-graph.png",
      ref: "jobs-history",
      linkText: "View Jobs History",
      color: "#006717",
      values: accountSummary?.jobs,
      filters: [{ type: "time", details: timeFilters }],
    },
    Overview: {
      title: "Overview",
      text: "Total Earned",
      img: "/images/arrowdown.jpeg",
      ref: "account-history",
      linkText: "View Earnings History",
      color: "#fcded1",
      values: accountSummary?.overview,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <TechAccountStat
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

export default AccountCard;
