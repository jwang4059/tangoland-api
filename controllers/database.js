const MongoClient = require("mongodb").MongoClient;

const handleDatabase = async (req, res) => {
	const client = new MongoClient(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		const collection = client.db("vocab").collection("data");
		// perform actions on the collection object
		const cursor = await collection.find();
		const vocabData = await cursor.toArray();
		if (vocabData) {
			res.json(vocabData);
		} else {
			res.status(400).json("failed");
		}
	} catch (e) {
		res.status(400).json(e);
	} finally {
		client.close();
	}
};

module.exports = {
	handleDatabase: handleDatabase,
};
