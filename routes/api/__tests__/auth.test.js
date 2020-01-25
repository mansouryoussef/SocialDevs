const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

beforeEach(async () => {
	// Overwrite timeout
	jest.setTimeout(10000);

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
		.expect(400)
		.then(res => {
			expect(res.body.errors[0].msg).toEqual('Wrong email or password!');
		});
});
