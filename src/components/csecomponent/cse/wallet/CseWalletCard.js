import WalletStat from "../../../qamastercomponent/wallet/WalletStat";
import { JobContainer } from "../../../../pages/franchisee/dashboard/JobManagement";
import { useState } from "react";
import WithdrawFund from "../../../../pages/qamaster/wallet/WithdrawFund";

const CseWalletCard = () => {
  const [openWithdrawalWallet, setOpenWithdrawalWallet] = useState(false);

  const openWithdrawalWalletHandler = () => {
    setOpenWithdrawalWallet(true);
  };

  const closeModalHandler = () => setOpenWithdrawalWallet(false);
  const accountSummary = {
    jobs: {
      totalDaily: 0,
      totalWeek: 1,
      totalMonth: 3,
      totalYear: 15,
    },
    referral: {
      totalDaily: 0,
      totalWeek: 0,
      totalMonth: 0,
      totalYear: 0,
    },
    withdraw: {
      totalDaily: 0,
      totalWeek: 0,
      totalMonth: 0,
      totalYear: 0,
    },
    balance: {
      totalDaily: 0,
      totalWeek: 0,
      totalMonth: 0,
      totalYear: 0,
    },
    retention: {
      totalDaily: 0,
      totalWeek: 0,
      totalMonth: 0,
      totalYear: 0,
    },
  };

  const filterBalance = [
    {
      id: 0,
      name: "Available balance",
      key: "availableBalance",
    },

    {
      id: 1,
      name: "This Day",
      key: "totalDay",
    },

    {
      id: 2,
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
    balance: {
      title: "",
      text: "Balance",
      img: "/images/wallet.png",
      ref: "withdraw-fund",
      linkText: "Withdraw fund",
      color: "var(--clr-primary)",
      values: accountSummary?.balance,
      filters: [{ type: "time", details: filterBalance }],
    },
    jobs: {
      title: "Job Fix Earnings",
      text: "Total Earned",
      img: "/images/line-graph.png",
      ref: "jobs-earnings",
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
      img: "/images/retention.jpg",
      ref: "retention",
      linkText: "View Retention History",
      color: "#006717",
      values: accountSummary?.retention,
      filters: [{ type: "time", details: timeFilters }],
    },
    withdrawal: {
      title: "Withdrawal",
      text: "Total Withdrawal",
      img: "/images/north-east-arrow.png",
      ref: "withdrawal-history",
      linkText: "View Withdraw-history",
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
        handleCardClick={openWithdrawalWalletHandler}
      />
    );
  });
  return (
    <>
      <JobContainer>{statsTemplate}</JobContainer>
      {openWithdrawalWallet && (
        <WithdrawFund
          isOpen={openWithdrawalWallet}
          closeModal={closeModalHandler}
        />
      )}
    </>
  );
};

export default CseWalletCard;
