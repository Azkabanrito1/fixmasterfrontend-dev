import styled from "styled-components";
import LineChart from "../../charts/LineChart";
import { AssignmentHeader } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";

const TotalSupply = ({ supplyMetricsForGraph }) => {
  const ratingData = {
    labels: supplyMetricsForGraph?.map((supply) => supply.dateCompleted),
    datasets: [
      {
        label: "Ratings per Month",
        data: supplyMetricsForGraph?.map((supply) => supply.totalCount),
        borderWidth: 3,
        borderColor: "rgba(242, 98, 34, 0.2)",
        backgroundColor: ["var(--clr-primary)"],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Ratings per Month",
        },
        legend: {
          display: false,
        },
      },
    },
  };
  return (
    <div>
      <AssignmentHeader className="mt-4">
        <h2>Total Supply</h2>
      </AssignmentHeader>
      <RatingData>
        <LineChart chartData={ratingData} options={ratingData.options} />
      </RatingData>
    </div>
  );
};

export default TotalSupply;

const RatingData = styled.div`
  margin-top: 3rem;
`;
