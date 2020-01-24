const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

beforeEach(async () => {
	// Clear all users.
	await User.deleteMany();

	// Mock user data
	let userMock = {
		name: 'User Mock',
		email: 'user@mock.fi',
		password: 'userMockPassword'
	};

	// Encrypt the password
	const salt = await bcrypt.genSalt(10);

	userMock.password = await bcrypt.hash(userMock.password, salt); // Hash the password

	// Create user.
	await new User(userMock).save();
}, 9000);

it('Should register a new user', async () => {
	await request(app)
		.post('/api/users')
		.send({
			name: 'Test User',
			email: 'test@user.fi',
			password: '123456'
		})
		.expect('Content-type', /json/)
		.expect(201);
});

it('Should login user', async () => {
	await request(app)
		.post('/api/auth')
		.send({
			email: 'user@mock.fi',
			password: 'userMockPassword'
		})
		.expect('Content-type', /json/)
		.expect(200);
});

it('Should not login user', async () => {
	await request(app)
		.post('/api/auth')
		.send({
			email: 'user@mock.fi',
			password: 'userMockPassword2'
		})
		.expect('Content-type', /json/)
		.expect(400);
});
