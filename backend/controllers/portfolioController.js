const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const getPortfolios = async (req, res) => {
	try {
		const db = getDb();
		const portfolios = await db.collection("portfolios").find().toArray();
		res.json(portfolios);
	} catch (error) {
		console.error("Error fetching portfolios:", error);
		res.status(500).json({ message: "Error fetching portfolios" });
	}
};

// Fetch portfolio data by portfolio ID
const getPortfolioDataById = async (req, res) => {
	const { portfolioId } = req.params;
	try {
		const db = getDb();
		const portfolioData = await db
			.collection("portfolioData")
			.find({ portfolioId: new ObjectId(portfolioId) }) // Change this based on your schema
			.toArray();
		console.log("portfolioData", portfolioData);
		res.json(portfolioData);
	} catch (error) {
		console.error("Error fetching portfolio data:", error);
		res.status(500).json({ message: "Error fetching portfolio data" });
	}
};

module.exports = { getPortfolios, getPortfolioDataById };
