const app = require('../src/app.js');
const supertest = require('supertest');
const request = supertest(app);
const { setupDatabase, tearDownDatabase, fail } = require('./helpers.js');

beforeAll(async () => {
	await setupDatabase();
});

afterAll(async () => {
	await tearDownDatabase();
});

describe('users tests', () => {
	it('should realize signup a user with success', () => {
		let user = {
			name: 'John Galt',
			email: `${Date.now()}@.com`,
			password: 'RANDom222',
		};

		return request
			.post('/users')
			.send(user)
			.then((res) => {
				expect(res.statusCode).toEqual(201);
			})
			.catch((e) => {
				fail(e);
			});
	});

	it('should prevent empty data from being inserted', () => {
		let user = { name: ' ', email: ' ', password: ' ' };
		return request
			.post('/users')
			.send(user)
			.then((res) => {
				expect(res.statusCode).toEqual(400);
			})
			.catch((e) => {
				fail(e);
			});
	});

	it('should prevent a duplicated email from being inserted', async () => {
		let user = {
			name: 'John Galt',
			email: `${Date.now()}@.com`,
			password: 'RANDom222',
		};
		try {
			await request.post('/users').send(user);
			let res = await request.post('/users').send(user);
			expect(res.statusCode).toEqual(400);
		} catch (e) {
			fail(e);
		}
	});
});
