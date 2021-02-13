const express = require("express");
const cors = require("cors");

const database = require("./controllers/database");
const dbsubset = require("./controllers/dbsubset");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("tangonorando-api is working");
});

app.get("/database", (req, res) => {
	database.handleDatabase(req, res);
});

app.get("/dbsubset/:offset", (req, res) => {
	const { offset } = req.params;
	dbsubset.handleDbsubset(req, res, parseInt(offset));
});

app.listen(process.env.PORT || 3001, () => {
	console.log("tangonorando-api is running");
});
