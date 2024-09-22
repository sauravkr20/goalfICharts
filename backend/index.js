const express = require("express");
const morgan = require("morgan");
const connectToDatabase = require("./config/db");
const portfoliosRouter = require("./routes/portfolio");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

// Middleware\
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/api", portfoliosRouter);

app.get("/", (req, res) => {
	res.send("Hello, Express!");
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
