import { JobContainer } from "../../../../../pages/franchisee/dashboard/JobManagement";
import CseAccountStat from "./CseAcountStat";

const AccountCard = () => {
  const accountSummary = {
    fixes: {
      totalWeek: 1,
      totalMonth: 3,
      totalYear: 15,
    },
    referral: {
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
      title: "Job Fix Earnings",
      text: "Total Earned",
      img: "/images/line-graph.png",
      ref: "jobs-earning",
      linkText: "View Job Fix Earnings",
      color: "#006717",
      values: accountSummary?.fixes,
      filters: [{ type: "time", details: timeFilters }],
    },
    referral: {
      title: "Referral Earnings",
      text: "Total Earned",
      img: "/images/cseAccout.jpeg",
      ref: "referrals-earning",
      linkText: "View Referrals Earnings",
      color: "#006717",
      values: accountSummary?.referral,
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

export default AccountCard;
