import { JobContainer } from "../../../pages/franchisee/dashboard/JobManagement";
import JobCards from "../../franchiseecomponents/dashboardcomponents/JobCards";

const TechnicianDashboardCards = ({ data = {} }) => {
  const accountSummary = {
    fixesEarning: {
      totalDaily: data?.dailyJobEarnings,
      totalWeek: data?.weeklyJobEarnings,
      totalMonth: data?.monthlyJobEarnings,
      totalYear: data?.yearlyJobEarnings,
    },
    earnings: {
      totalDaily: data?.dailyEarnings,
      totalWeek: data?.weeklyEarnings,
      totalMonth: data?.monthlyEarnings,
      totalYear: data?.yearlyEarnings,
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
      title: "Job",
      text: "Total Earned",
      img: "/images/line-graph.png",
      ref: "jobs-earning",
      linkText: "View Jobs Done",
      color: "#006717",
      values: accountSummary?.jobsDone,
      filters: [{ type: "time", details: timeFilters }],
    },
    earnings: {
      title: "Overview",
      text: "Total Earned",
      img: "/images/cseAccout.jpeg",
      ref: "account",
      linkText: "View Earnings History",
      color: "#F2622236",
      values: accountSummary?.fixesEarning,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <JobCards
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

export default TechnicianDashboardCards;
