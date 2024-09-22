import React from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const PortfolioChart = ({ data }) => {
	const chartData = {
		labels: data.map((item) => item.date),
		datasets: [
			{
				label: "Alpha Blend – Market Leaders",
				data: data.map((item) => item.alphaBlend),
				borderColor: "rgba(75, 192, 192, 1)",
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				fill: true,
			},
			{
				label: "NIFTY Smallcap 100",
				data: data.map((item) => item.niftySmallcap),
				borderColor: "rgba(153, 102, 255, 1)",
				backgroundColor: "rgba(153, 102, 255, 0.2)",
				fill: true,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Portfolio Performance Comparison",
			},
		},
	};

	return <Line data={chartData} options={chartOptions} />;
};

// PropTypes validation
PortfolioChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			alphaBlend: PropTypes.number.isRequired,
			niftySmallcap: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default PortfolioChart;
