const express = require('express');
const app = express();
const db = require('./database/connection.js');
const UserFactory = require('./factories/UserFactory.js');
const userService = UserFactory.generateInstance();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	return res.sendStatus(200);
});

app.post('/users', async (req, res) => {
	const { name, email, password } = req.body;
	let result = await userService.create(name, email, password);
	const status = result.error ? 400 : 201;
	res.status(status).json({ message: result.message });
});

module.exports = app;
