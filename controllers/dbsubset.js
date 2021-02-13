const MongoClient = require("mongodb").MongoClient;

const handleDbsubset = async (req, res, offset) => {
	const client = new MongoClient(process.env.MONGODB_URI, {
		useUnifiedTopology: true,
	});
	client.connect(async (err) => {
		const collection = client.db("vocab").collection("data");
		// perform actions on the collection object
		const cursor = await collection.find({}, { limit: 20, skip: offset });
		const vocabData = await cursor.toArray();
		if (vocabData) {
			res.json(vocabData);
		} else {
			res.status(400).json("failed");
		}
		client.close();
	});
};

module.exports = {
	handleDbsubset: handleDbsubset,
};
