const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

// Mock user data
const userMock = {
	name: 'User Mock',
	email: 'user@mock.fi',
	password: 'userMockPassword'
};

const { name, email, password } = userMock;

const getAuthToken = async () =>
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
			return res.body.token;
		});

describe('Auth api', () => {
	afterEach(async () => {
		// Clear all users.
		await User.deleteMany();
	});

	it('Should get all user data without password', async () => {
		const userToken = await getAuthToken();

		await request(app)
			.get('/api/auth')
			.set('x-auth-token', userToken)
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				const resKeys = Object.keys(res.body);
				const expectedKeys = ['_id', 'name', 'email', 'avatar', 'date', '__v'];
				const unexpectedKeys = ['password'];

				expect(resKeys).toEqual(expectedKeys);
				expect(resKeys).not.toEqual(unexpectedKeys);
			});
	});

	it('Should login user & return user token', async () => {
		// Register a user
		await request(app)
			.post('/api/users')
			.send({
				name,
				email,
				password
			})
			.expect(201);

		// Try to login registered user
		await request(app)
			.post('/api/auth')
			.send({
				email,
				password
			})
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body.token).toBeTruthy();
			});
	});

	it('Should not login due to wrong email', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email: 'wrong@email.fi',
				password
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Wrong email or password!');
			});
	});

	it('Should not login due to wrong password', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email,
				password: 'wrongpassword'
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Wrong email or password!');
			});
	});

	it('Should respond with error due to empty password field', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email,
				password: ''
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Password is required!');
			});
	});

	it('Should respond with error due to empty email field', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email: '',
				password
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Email is required!');
			});
	});

	it('Should respond with error due to invalid email', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email: 'invalid.com',
				password
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Please enter a valid email!');
			});
	});
});
