import React from "react";
import TechAccountStat from "../../qamastercomponent/account/TechAccountStat";
import { JobContainer } from "../../../pages/franchisee/dashboard/JobManagement";

const SuppliesCard = () => {
  const accountSummary = {
    supplies: {
      totalDaily: 0,
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
    supplies: {
      title: "Supplies",
      text: "Total Supplies",
      img: "/images/line-graph.png",
      ref: "supplies-history",
      linkText: "View Supplies History",
      color: "#006717",
      values: accountSummary?.supplies,
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

export default SuppliesCard;
