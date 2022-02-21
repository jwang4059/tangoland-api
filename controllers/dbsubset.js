const MongoClient = require("mongodb").MongoClient;

const handleDbsubset = async (req, res, offset) => {
	const client = new MongoClient(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		const collection = client.db("vocab").collection("data");
		// perform actions on the collection object
		const cursor = await collection.find({}, { limit: 20, skip: offset });
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
	handleDbsubset: handleDbsubset,
};
