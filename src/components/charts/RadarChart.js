import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const RadarChart = ({ chartData, options }) => {
  return <Radar data={chartData} options={options} />;
};

export default RadarChart;
