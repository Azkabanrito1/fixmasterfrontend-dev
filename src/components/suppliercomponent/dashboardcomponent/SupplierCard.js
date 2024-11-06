import { JobContainer } from "../../../pages/franchisee/dashboard/JobManagement";
import SupplierStats from "./SupplierStats";

const SupplierCard = ({ data }) => {
  const accountSummary = {
    supplierEarning: {
      totalDaily: data?.dayCompletedSupplies,
      totalWeek: data?.weekCompletedSupplies,
      totalMonth: data?.monthCompletedSupplies,
      totalYear: data?.yearCompletedSupplies,
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
      title: "Supplies",
      text: "Total Supplies",
      img: "/images/line-graph.png",
      ref: "history",
      linkText: "View supplies history",
      color: "#006717",
      values: accountSummary?.supplierEarning,
      filters: [{ type: "time", details: timeFilters }],
    },
  };

  const statsTemplate = Object.keys(accountStatus).map((status) => {
    return (
      <SupplierStats
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

export default SupplierCard;
