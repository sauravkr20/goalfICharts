const { MongoClient } = require("mongodb");

// MongoDB connection string (adjust this to your local/remote setup)
const uri = "mongodb://localhost:27017"; // Change if needed

let client;

const connectToDatabase = async () => {
	try {
		client = new MongoClient(uri);
		await client.connect();
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};

const getDb = () => {
	return client.db("goalfi"); // Replace 'goalfi' with your actual database name
};

module.exports = connectToDatabase;
module.exports.getDb = getDb;
