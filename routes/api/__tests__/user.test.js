const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');

beforeEach(async () => {
	// Clear all users.
	await User.deleteMany();
});

it('Should register a new user', async () => {
	await request(app)
		.post('/api/users')
		.send({
			name: 'Test User',
			email: 'test@user.fi',
			password: '123456'
		})
		.expect('Content-type', /json/)
		.expect(201)
		.then(res => {
			expect(res.body.token).toBeTruthy;
		});
});
