import BarChart from "../../charts/BarChart";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { GroupHeading } from "../../globalcomponents/Utilities";

const RevenueSection = ({ data, isLoading }) => {
  const maxRevenue = data
    ? Math.max(
        ...data?.map((revenue) =>
          parseFloat(revenue.totalRevenue.replace(/,/g, ""))
        )
      )
    : null;

  const revenueData = {
    labels: data?.map((revenue) => revenue.revenueMonth),
    datasets: [
      {
        label: "Earning per Month",
        data: data?.map((revenue) =>
          parseFloat(revenue.totalRevenue.replace(/,/g, ""))
        ),
        borderWidth: 1,
        backgroundColor: ["rgba(242, 98, 34, 0.8)"],
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          max: maxRevenue + 100000,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Revenue per month",
        },
        legend: {
          display: false,
        },
      },
    },
  };

  return (
    <div>
      <GroupHeading>Revenue</GroupHeading>

      <GlobalBallBeat loading={isLoading} />
      {!isLoading && <BarChart chartData={revenueData} />}
    </div>
  );
};

export default RevenueSection;
