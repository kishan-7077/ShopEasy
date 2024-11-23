require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT;
const Mongo_Url = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
	.connect(Mongo_Url)
	.then(() => {
		console.log("Connected to DB : ");
	})
	.catch((err) => {
		console.log("Error connectiong to DB :", err);
	});

// User Routes
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

app.listen(port, () => {
	console.log(`Listning to port : ${port}`);
});
