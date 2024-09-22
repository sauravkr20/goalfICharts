const express = require("express");
const {
	getPortfolios,
	getPortfolioDataById,
} = require("../controllers/portfolioController");

const router = express.Router();

// Route to get portfolios
router.get("/portfolios", getPortfolios);
router.get("/portfolioData/:portfolioId", getPortfolioDataById);

module.exports = router;
