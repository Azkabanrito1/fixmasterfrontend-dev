import React from "react";
import { cseData, cseRatingData } from "../../../utils/chartData";
import { useState } from "react";
import styled from "styled-components";
import LineChart from "../../charts/LineChart";

const DashboardCallAnalysis = () => {
  const maxEarning = Math.max(...cseData.map((cse) => cse.earning));
  const minEarning = Math.min(...cseData.map((cse) => cse.earning));
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [jobDetailTitle, setJobDetailTitle] = useState("");
  const [earningData, setEarningData] = useState({
    labels: cseData.map((cse) => cse.month),
    datasets: [
      {
        label: "Earning per Month",
        data: cseData.map((cse) => cse.earning),
        borderWidth: 1,
        backgroundColor: ["rgba(242, 98, 34, 0.7)"],
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          max: maxEarning + 5000,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Earning per month",
        },
        legend: {
          display: false,
        },
      },
    },
  });

  const [ratingData, setRatingData] = useState({
    labels: cseData.map((cse) => cse.month),
    datasets: [
      {
        label: "Ratings per Month",
        data: cseData.map((cse) => cse.rating),
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
  });

  const [ratingBreakdown, setRatingBreakdown] = useState({
    labels: cseRatingData.map((rating) => rating.name),
    datasets: [
      {
        label: "",
        data: cseRatingData.map((rating) => rating.rating),
        borderWidth: 3,
        borderColor: "var(--clr-primary)",
        backgroundColor: ["rgba(242, 98, 34, 0.2)"],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Ratings Chart",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          max: 5,
          suggestedMin: 2,
          beginAtZero: true,
          angleLines: {
            color: "#111",
          },
          ticks: {
            stepSize: 0.5,
          },
        },
      },
    },
  });
  return (
    <RatingData>
      <LineChart chartData={ratingData} options={ratingData.options} />
    </RatingData>
  );
};

export default DashboardCallAnalysis;

const RatingData = styled.div`
  margin-top: 3rem;
`;
