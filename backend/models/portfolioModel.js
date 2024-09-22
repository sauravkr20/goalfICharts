const { getDb } = require("../config/db");

const Portfolio = {
	findAll: async () => {
		const db = getDb();
		return await db.collection("portfolios").find().toArray();
	},
};

module.exports = Portfolio;
