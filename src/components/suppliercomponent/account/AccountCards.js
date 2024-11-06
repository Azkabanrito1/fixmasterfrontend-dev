import { JobContainer } from "../../../pages/franchisee/dashboard/JobManagement";
import TechAccountStat from "../../qamastercomponent/account/TechAccountStat";

const AccountCards = () => {
  const accountSummary = {
    retention: {
      totalDaily: 0,
      totalWeek: 1,
      totalMonth: 3,
      totalYear: 15,
    },
    overview: {
      totalWeek: "1,000",
      totalMonth: "3,850",
      totalYear: "32,599",
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
      title: "Retention",
      text: "Total Retention",
      img: "/images/retention.jpg",
      ref: "retentions",
      linkText: "View Retention History",
      color: "#006717",
      values: accountSummary?.retention,
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

export default AccountCards;
