const MongoClient = require("mongodb").MongoClient;

const handleDatabase = async (req, res) => {
	const client = new MongoClient(process.env.MONGODB_URI, {
		useUnifiedTopology: true,
	});
	client.connect(async (err) => {
		const collection = client.db("vocab").collection("data");
		// perform actions on the collection object
		const cursor = await collection.find();
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
	handleDatabase: handleDatabase,
};
