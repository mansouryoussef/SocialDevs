const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');

// Mock user data
const userMock = {
	name: 'Test User',
	email: 'test@user.fi',
	password: '123456'
};

const { name, email, password } = userMock;

describe('User api', () => {
	afterEach(async () => {
		// Clear all users.
		await User.deleteMany();
	});

	it('Should register a new user and return token', async () => {
		await request(app)
			.post('/api/users')
			.send({
				name,
				email,
				password
			})
			.expect('Content-type', /json/)
			.expect(201)
			.then(res => {
				expect(res.body.token).toBeTruthy;
			});
	});

	it('Should fail due to password having less than 6 characters', async () => {
		await request(app)
			.post('/api/users')
			.send({
				name,
				email,
				password: '12345'
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Password 6+ characters');
			});
	});

	it('Should fail due to invalid email', async () => {
		await request(app)
			.post('/api/users')
			.send({
				name,
				email: 'invalid.com',
				password
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Email is invalid!');
			});
	});

	it('Should fail due to empty name field', async () => {
		await request(app)
			.post('/api/users')
			.send({
				name: '',
				email,
				password
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Name is required!');
			});
	});
});
