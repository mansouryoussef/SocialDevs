const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const { registerUser, genarateUserData } = require('./services/user.service');

// Mock user data
const userMock = {
	name: 'User Mock',
	email: 'user@mock.fi',
	password: 'userMockPassword'
};

const { email, password } = userMock;

describe('Auth api', () => {
	beforeAll(async () => {
		await request(app)
			.post('/api/users')
			.send(userMock)
			.expect('Content-type', /json/)
			.expect(201);
	});

	describe('Login user', () => {
		it('Should login user & return user token', () =>
			request(app)
				.post('/api/auth')
				.set('Content-Type', 'application/json')
				.send({
					email,
					password
				})
				.expect('Content-type', /json/)
				.expect(200)
				.then(res => {
					expect(res.body.token).toBeTruthy();
				}));

		it('Should not login due to wrong email', () =>
			request(app)
				.post('/api/auth')
				.send({
					email: 'wrong@email.fi',
					password
				})
				.expect('Content-type', /json/)
				.expect(400)
				.then(res => {
					expect(res.body.errors[0].msg).toEqual('Wrong email or password!');
				}));

		it('Should not login due to wrong password', () =>
			request(app)
				.post('/api/auth')
				.send({
					email,
					password: 'wrongpassword'
				})
				.expect('Content-type', /json/)
				.expect(400)
				.then(res => {
					expect(res.body.errors[0].msg).toEqual('Wrong email or password!');
				}));

		it('Should respond with error due to empty password field', () =>
			request(app)
				.post('/api/auth')
				.send({
					email,
					password: ''
				})
				.expect('Content-type', /json/)
				.expect(400)
				.then(res => {
					expect(res.body.errors[0].msg).toEqual('Password is required!');
				}));

		it('Should respond with error due to empty email field', () =>
			request(app)
				.post('/api/auth')
				.send({
					email: '',
					password
				})
				.expect('Content-type', /json/)
				.expect(400)
				.then(res => {
					expect(res.body.errors[0].msg).toEqual('Email is required!');
				}));

		it('Should respond with error due to invalid email', () =>
			request(app)
				.post('/api/auth')
				.send({
					email: 'invalid.com',
					password
				})
				.expect('Content-type', /json/)
				.expect(400)
				.then(res => {
					expect(res.body.errors[0].msg).toEqual('Please enter a valid email!');
				}));
	});

	it('Should get all user data without password', async () => {
		const userToken = await registerUser(genarateUserData());

		return request(app)
			.get('/api/auth')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				const expectedKeys = ['_id', 'name', 'email', 'avatar', 'date', '__v'];
				const unexpectedKeys = ['password'];
				const keys = Object.keys(res.body);

				expect(keys).toEqual(expect.arrayContaining(expectedKeys));
				expect(keys).not.toEqual(expect.arrayContaining(unexpectedKeys));
			});
	});

	afterAll(async () => {
		// Clear all users.
		await User.deleteMany();
	});
});
