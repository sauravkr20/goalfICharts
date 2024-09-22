import React, { useEffect, useState } from "react";
import axios from "axios";
import PortfolioChart from "./PortfolioChart";

const App = () => {
	const [portfolios, setPortfolios] = useState([]);
	const [selectedPortfolio, setSelectedPortfolio] = useState(null);
	const [portfolioData, setPortfolioData] = useState([]);

	useEffect(() => {
		// Fetch portfolios on component mount
		axios
			.get("http://localhost:8000/api/portfolios")
			.then((response) => {
				setPortfolios(response.data);
			})
			.catch((error) => {
				console.error("Error fetching portfolios:", error);
			});
	}, []);

	const handlePortfolioChange = (event) => {
		const portfolioId = event.target.value;
		setSelectedPortfolio(portfolioId);
		console.log("portfolioId", portfolioId);

		// Fetch the portfolio data based on the selected portfolio
		axios
			.get(`http://localhost:8000/api/portfolioData/${portfolioId}`)
			.then((response) => {
				console.log("response", response);
				setPortfolioData(response.data);
			})
			.catch((error) => {
				console.error("Error fetching portfolio data:", error);
			});
	};

	return (
		<div className="App">
			<h1>Portfolio Performance Dashboard</h1>

			<div>
				<label htmlFor="portfolio">Select a Portfolio: </label>
				<select
					id="portfolio"
					onChange={handlePortfolioChange}
					value={selectedPortfolio || ""}
				>
					<option value="">-- Select a Portfolio --</option>
					{portfolios.map((portfolio) => (
						<option key={portfolio._id} value={portfolio._id}>
							{portfolio.name}
						</option>
					))}
				</select>
			</div>

			{portfolioData.length > 0 && (
				<div>
					<h2>Performance Chart</h2>
					<PortfolioChart data={portfolioData} />
				</div>
			)}
		</div>
	);
};

export default App;
