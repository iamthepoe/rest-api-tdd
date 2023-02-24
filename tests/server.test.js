let app = require('../src/app.js');
let supertest = require('supertest');
let request = supertest(app);
const { setupDatabase, tearDownDatabase, fail } = require('./helpers.js');

beforeAll(async () => {
	await setupDatabase();
});

afterAll(async () => {
	tearDownDatabase();
});

it('server should be responding in 3000 port', () => {
	return request
		.get('/')
		.then((res) => {
			let status = res.statusCode;
			expect(status).toEqual(200);
		})
		.catch((error) => {
			fail(error);
		});
});
