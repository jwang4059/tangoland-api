const MongoClient = require("mongodb").MongoClient;

const handleInsertDocument = async (req, res) => {
	const { expression, kana, romaji, meaning } = req.body;

	if (![expression, kana, romaji, meaning].every(Boolean)) {
		return res.json({
			status: "failed",
			message: "missing required parameters",
		});
	}

	const vocabDocument = {
		expression,
		kana: kana.split(";"),
		romaji: romaji.split(";"),
		meaning: meaning.split(";"),
	};

	const client = new MongoClient(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	try {
		await client.connect();
		const collection = client.db("vocab").collection("data");
		const result = await collection.insertOne(vocabDocument);
		if (result.insertedCount === 1) {
			res.json({
				status: "success",
				message: result.insertedId,
			});
		} else {
			res.status(400).json({
				status: "failed",
				message: "unable to insert",
			});
		}
	} catch (e) {
		res.status(400).json(e);
	} finally {
		client.close();
	}
};

module.exports = {
	handleInsertDocument,
};
