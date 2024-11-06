import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart = ({ chartData, options }) => {
  return <Line data={chartData} options={options} />;
};

export default LineChart;
