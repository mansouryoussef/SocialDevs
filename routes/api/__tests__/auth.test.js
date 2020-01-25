const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

// Mock user data
let userMock = {
	name: 'User Mock',
	email: 'user@mock.fi',
	password: 'userMockPassword'
};

describe('Auth api', () => {
	beforeEach(async () => {
		// Clear all users.
		await User.deleteMany();

		const { name, email, password } = userMock;

		// Generate salt
		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		// Create & save user.
		await new User({ name, email, password: hashedPassword }).save();
	});

	it('Should get user data without password', async () => {
		// Get user token for authentication.
		const userToken = await request(app)
			.post('/api/auth')
			.send({
				email: userMock.email,
				password: userMock.password
			})
			.then(res => {
				return res.body.token;
			});

		await request(app)
			.get('/api/auth')
			.set('x-auth-token', userToken)
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				const { password, _id, name, email } = res.body;

				expect(password).toBeFalsy;
				expect(_id).toBeTruthy;
				expect(name).toBeTruthy;
				expect(email).toBeTruthy;
			});
	});

	it('Should login user & return user token', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email: userMock.email,
				password: userMock.password
			})
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body.token).toBeTruthy;
			});
	});

	it('Should not login due to wrong email', async () => {
		await request(app)
			.post('/api/auth')
			.send({
				email: 'wrong@email.fi',
				password: userMock.password
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
				email: userMock.email,
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
				email: userMock.email,
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
				password: userMock.password
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
				password: userMock.password
			})
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Please enter a valid email!');
			});
	});
});
