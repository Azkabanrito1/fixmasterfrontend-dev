import { JobContainer } from "../../../../../pages/franchisee/dashboard/JobManagement";
import WalletStat from "./WalletStat";

const WalletCard = () => {
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
    balance: {
      totalWeek: "1,000",
      totalMonth: "3,850",
      totalYear: "32,599",
    },
  };
  const filterBalance = [
    {
      id: 1,
      name: "Available balance",
      key: "availableBalance",
    },
    {
      id: 1,
      name: "This Week",
      key: "totalWeek",
    },
    {
      id: 3,
      name: "This Month",
      key: "totalMonth",
    },
    {
      id: 4,
      name: "This Year",
      key: "totalYear",
    },
  ];
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
    balance: {
      title: "",
      text: "Balance",
      img: "",
      ref: "withdraw-fund",
      linkText: "Withdrawal fund",
      color: "var(--clr-primary)",
      values: accountSummary?.balance,
      filters: [{ type: "time", details: filterBalance }],
    },
    jobs: {
      title: "Job Fix Earnings",
      text: "Total Earned",
      img: "/images/line-graph.png",
      ref: "jobs-earning",
      linkText: "View Job Fix Earnings",
      color: "#006717",
      values: accountSummary?.jobs,
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
    retention: {
      title: "Retention",
      text: "Total Retention",
      img: "",
      ref: "retention",
      linkText: "View retention history",
      color: "#006717",
      values: accountSummary?.retention,
      filters: [{ type: "time", details: timeFilters }],
    },
    withdrawal: {
      title: "Withdrawal",
      text: "Total Withdrawal",
      img: "",
      ref: "retention",
      linkText: "withdraw-history",
      color: "#fcded1",
      values: accountSummary?.withdraw,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <WalletStat
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

export default WalletCard;
