import React from "react";
import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
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

const PortfolioChart = ({ data, portfolio }) => {
	// If portfolio or portfolio.indexes is undefined, return null to avoid crashes
	if (!portfolio || !portfolio.indexes) {
		return <div>No portfolio data available</div>;
	}

	const chartData = {
		labels: data.map((item) => item.date),
		datasets: Object.keys(portfolio.indexes).map((key, index) => ({
			label: portfolio.indexes[key],
			data: data.map((item) => item[key]),
			borderColor:
				index % 2 === 0 ? "rgba(75, 192, 192, 1)" : "rgba(153, 102, 255, 1)",
			backgroundColor:
				index % 2 === 0
					? "rgba(75, 192, 192, 0.2)"
					: "rgba(153, 102, 255, 0.2)",
			fill: true,
		})),
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

// Add PropTypes validation
PortfolioChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			// Other keys depend on the portfolio indexes
		})
	).isRequired,
	portfolio: PropTypes.shape({
		indexes: PropTypes.objectOf(PropTypes.string).isRequired,
	}).isRequired,
};

export default PortfolioChart;
