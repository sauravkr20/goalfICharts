const { createReadStream } = require("fs");
const csv = require("csv-parser");
const { MongoClient, ObjectId } = require("mongodb");

// MongoDB connection URL
const url = "mongodb://127.0.0.1:27017/";

// Database and collection names
const dbName = "goalfi";
const portfolioDataCollection = "portfolioData";
const portfoliosCollection = "portfolios";

// CSV file path
const csvFilePath = "../data/GOALMO_0100_Historical.csv"; // Replace with the actual path to your CSV file

(async () => {
	try {
		console.log("going to connect");

		// Connect to MongoDB using async/await
		const client = await MongoClient.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("connected");

		const db = client.db(dbName);
		const portfolioId = new ObjectId(); // Create a new ObjectId

		// Prepare an array to hold portfolioData documents
		const portfolioDataDocuments = [];

		// Read and parse the CSV
		createReadStream(csvFilePath)
			.pipe(csv())
			.on("data", (row) => {
				// Create a document for each row in portfolioData
				const portfolioDataDoc = {
					_id: new ObjectId(),
					date: row.Date,
					alphaBlend: parseFloat(row["Alpha Blend – Market Leaders"]),
					niftySmallcap: parseFloat(row["NIFTY Smallcap 100"]),
					portfolioId: portfolioId,
				};
				portfolioDataDocuments.push(portfolioDataDoc);
			})
			.on("end", async () => {
				try {
					// Insert all portfolioData documents into the collection
					await db
						.collection(portfolioDataCollection)
						.insertMany(portfolioDataDocuments);

					// Create a document for portfolios collection with the same ObjectId
					const portfoliosDoc = {
						_id: portfolioId,
						name: "Alpha Blend – Market Leaders",
						indexes: {
							alphaBlend: "Alpha Blend – Market Leaders",
							niftySmallcap: "NIFTY Smallcap 100",
						},
					};

					// Insert into portfolios collection
					await db.collection(portfoliosCollection).insertOne(portfoliosDoc);
					console.log("Documents inserted successfully!");

					client.close();
				} catch (error) {
					console.error("Error inserting documents:", error);
					client.close();
				}
			});
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
})();
