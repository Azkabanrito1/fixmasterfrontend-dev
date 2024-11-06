import { JobContainer } from "../../../../../pages/franchisee/dashboard/JobManagement";
import JobCards from "../../../../franchiseecomponents/dashboardcomponents/JobCards";
import JobStat from "../../../../qamastercomponent/dashboardcomponent/JobStat";

const CseJobsCards = ({ data = {} }) => {
  const accountSummary = {
    fixesEarning: {
      totalDaily: data?.dailyJobEarnings,
      totalWeek: data?.weeklyJobEarnings,
      totalMonth: data?.monthlyJobEarnings,
      totalYear: data?.yearlyJobEarnings,
    },
    referralEarnings: {
      totalDaily: data?.dailyReferralEarnings,
      totalWeek: data?.weeklyReferralEarnings,
      totalMonth: data?.monthlyReferralEarnings,
      totalYear: data?.yearlyReferralEarnings,
    },
  };

  const timeFilters = [
    {
      id: 0,
      name: "This Day",
      key: "totalDaily",
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
      title: "Job Fixing Earnings",
      text: "Total Earned",
      img: "/images/line-graph.png",
      ref: "account",
      linkText: "View Job Fixing Earnings",
      color: "#006717",
      values: accountSummary?.fixesEarning,
      filters: [{ type: "time", details: timeFilters }],
    },
    referral: {
      title: "Referral Earnings",
      text: "Total Earned",
      img: "/images/cseAccout.jpeg",
      ref: "referrals",
      linkText: "View Referral Earnings",
      color: "#006717",
      values: accountSummary?.referralEarnings,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <JobStat
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

export default CseJobsCards;
