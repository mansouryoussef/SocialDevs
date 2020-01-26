const request = require('supertest');
const app = require('../../../app');
const User = require('../../../models/User');
const Profile = require('../../../models/Profile');
const { registerUser, genarateUserData } = require('./services/user.service');

const profileMock = {
	title: 'Nice title',
	skills: 'javascript,React.js, Node.js',
	location: 'Vaasa, Finland',
	website: 'codepanda.test',
	bio: 'MERN stack developer'
};

describe('Profile api', () => {
	let userToken = '';
	jest.setTimeout(10000);

	beforeAll(async () => {
		userToken = await registerUser(genarateUserData());
		// await new Profile(profileMock).save();f
	});

	afterAll(async () => {
		// Clear all users.
		await User.deleteMany();
		await Profile.deleteMany();
	});

	it('Should fail due to not having a profile', async () =>
		request(app)
			.get('/api/profile/me')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.msg).toEqual('There is no profile for this user');
			}));

	it('Should create a new profile', async () =>
		request(app)
			.post('/api/profile')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.send(profileMock)
			.expect('Content-type', /json/)
			.expect(201)
			.then(res => {
				const expectedKeys = [
					'_id',
					'title',
					'skills',
					'location',
					'website',
					'bio',
					'experience',
					'education',
					'date',
					'__v',
					'user'
				];
				const keys = Object.keys(res.body);

				expect(keys).toEqual(expect.arrayContaining(expectedKeys));
			}));

	it('Should not update profile due to empty title field', async () =>
		request(app)
			.post('/api/profile')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.send({ ...profileMock, title: '' })
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Title is required');
			}));

	it('Should not update profile due to empty skills field', async () =>
		request(app)
			.post('/api/profile')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.send({ ...profileMock, skills: '' })
			.expect('Content-type', /json/)
			.expect(400)
			.then(res => {
				expect(res.body.errors[0].msg).toEqual('Skills are required');
			}));

	it('Should update profile', async () =>
		request(app)
			.post('/api/profile')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.send({ ...profileMock, twitter: 'twitter.com', title: 'New title' })
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				const expectedKeys = ['twitter', 'title'];
				const keys = Object.keys(res.body);

				expect(keys).toEqual(expect.arrayContaining(expectedKeys));
				expect(res.body.title).toEqual('New title');
			}));

	it('Should get user profile with added user field including name field', async () =>
		request(app)
			.get('/api/profile/me')
			.set('Content-Type', 'application/json')
			.set('x-auth-token', userToken)
			.expect('Content-type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body.user.name).toBeTruthy();
			}));
});
