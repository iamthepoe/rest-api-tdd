const mongoose = require('mongoose');
require('dotenv').config();

async function setupDatabase() {
	mongoose.set('strictQuery', false);
	await mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
		})
		.catch((e) => console.log(e));
}

async function tearDownDatabase() {
	await mongoose.disconnect();
}

function fail(error = 'fail was called in a test.') {
	throw new Error(error);
}

module.exports = { fail, setupDatabase, tearDownDatabase };
