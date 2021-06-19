const mongoose = require("mongoose");

const connectToMongoDB = () => {
	const URI = "mongodb://localhost/accounts";
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	};
	mongoose.connect(URI, options)
		.then(() => console.log("Connected to MongoDB"))
		.catch(error => console.log("Connection Error:", error));
};

module.exports = connectToMongoDB;