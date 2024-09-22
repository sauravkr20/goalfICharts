import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioChart from "./PortfolioChart";

const App = () => {
	const [portfolios, setPortfolios] = useState([]);
	const [selectedPortfolio, setSelectedPortfolio] = useState("");
	const [selectedPortfolioObject, setSelectedPortfolioObject] = useState(null);
	const [portfolioData, setPortfolioData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/portfolios")
			.then((response) => {
				setPortfolios(response.data);
			})
			.catch((error) => {
				console.error("Error fetching portfolios:", error);
				setError("Failed to load portfolios.");
			});
	}, []);

	const handlePortfolioChange = (event) => {
		const portfolioId = event.target.value;
		setSelectedPortfolio(portfolioId);

		const selectedPortfolioObj = portfolios.find(
			(portfolio) => portfolio._id === portfolioId
		);
		setSelectedPortfolioObject(selectedPortfolioObj || null);

		if (portfolioId) {
			axios
				.get(`http://localhost:8000/api/portfolioData/${portfolioId}`)
				.then((response) => {
					setPortfolioData(response.data);
				})
				.catch((error) => {
					console.error("Error fetching portfolio data:", error);
					setError("Failed to load portfolio data.");
				});
		} else {
			setPortfolioData([]);
		}
	};

	return (
		<div className="App bg-gray-100 min-h-screen p-6 font-sans">
			<h1 className="text-3xl font-light text-center text-blue-600 mb-8">
				Portfolio Performance Dashboard
			</h1>

			{error && <div className="text-red-600 text-center mb-4">{error}</div>}

			<div className="flex justify-center mb-6">
				<label
					htmlFor="portfolio"
					className="text-lg font-normal text-gray-700 mr-4"
				>
					Select a Portfolio:
				</label>
				<select
					id="portfolio"
					onChange={handlePortfolioChange}
					value={selectedPortfolio}
					className="bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="">-- Select a Portfolio --</option>
					{portfolios.map((portfolio) => (
						<option key={portfolio._id} value={portfolio._id}>
							{portfolio.name}
						</option>
					))}
				</select>
			</div>

			{portfolioData.length > 0 ? (
				<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
					<h2 className="text-2xl font-light text-gray-800 mb-4">
						Performance Chart
					</h2>
					<PortfolioChart
						portfolio={selectedPortfolioObject}
						data={portfolioData}
					/>
				</div>
			) : (
				selectedPortfolio && (
					<div className="text-center text-lg text-gray-600 mt-6">
						No data available for this portfolio.
					</div>
				)
			)}
		</div>
	);
};

export default App;
