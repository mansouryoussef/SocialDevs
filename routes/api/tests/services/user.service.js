const request = require('supertest');
const app = require('../../../../app');

const genarateUserData = () => {
	const id = new Date().getTime();

	return {
		name: 'Test User',
		email: `${id}@test.fi`,
		password: '123456'
	};
};

const registerUser = async userMock =>
	await request(app)
		.post('/api/users')
		.send(userMock)
		.expect('Content-type', /json/)
		.expect(201)
		.then(res => {
			return res.body.token;
		});

module.exports = {
	registerUser,
	genarateUserData
};
