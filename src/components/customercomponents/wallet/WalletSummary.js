import styled from "styled-components";
import AccountStatCard from "../account/AccountStatCard";

const WalletSummary = ({ data = {}, openFundWallet }) => {
  const earningSummary = {
    totalWeek: data?.earnings?.weekTotal,
    totalMonth: data?.earnings?.monthTotal,
    totalYear: data?.earnings?.yearTotal,
  };

  const referralSummary = {
    totalWeek: data?.referralSummary?.totalWeek,
    totalMonth: data?.referralSummary?.totalMonth,
    totalYear: data?.referralSummary?.totalYear,
  };

  const loyaltySummary = {
    totalWeek: data?.loyaltySummary?.totalWeek,
    totalMonth: data?.loyaltySummary?.totalMonth,
    totalYear: data?.loyaltySummary?.totalYear,
  };

  const overviewSummary = {
    totalWeek: data?.overviewSummary?.totalWeek,
    totalMonth: data?.overviewSummary?.totalMonth,
    totalYear: data?.overviewSummary?.totalYear,
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

  const balance = [{ id: 1, name: "Balance", key: "balance" }];

  const accountStatus = {
    wallet: {
      title: "Wallet",
      text: "Balance",
      img: "/images/orange-wallet.png",
      ref: "fund-wallet",
      linkText: "Fund Wallet",
      color: "var(--clr-primary)",
      values: { balance: data?.walletBalance },
      filters: [{ type: "balance", details: balance }],
    },
    referrals: {
      title: "Referral Earnings",
      text: "Total Earned",
      img: "/images/green-plane.png",
      ref: "referrals",
      linkText: "View Referral Earnings",
      color: "#006717",
      values: referralSummary,
      filters: [{ type: "time", details: timeFilters }],
    },
    loyalty: {
      title: "Loyalty Earnings",
      text: "Total Earned",
      img: "/images/green-line-graph.png",
      ref: "loyalty",
      linkText: "View Loyalty Earnings",
      color: "#006717",
      values: loyaltySummary,
      filters: [{ type: "time", details: timeFilters }],
    },
    overview: {
      title: "Overview",
      text: "Total Earned",
      img: "/images/south-west-arrow.png",
      ref: "transaction-history",
      linkText: "View Transaction History",
      color: "var(--clr-primary)",
      values: overviewSummary,
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
        openFundWallet={openFundWallet}
      />
    );
  });

  return <StatsContainer>{statsTemplate}</StatsContainer>;
};

export default WalletSummary;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
