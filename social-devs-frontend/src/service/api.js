import Axios from 'axios';

// Creates a header object
export const createAuthHeader = token => ({
	'x-auth-token': token,
	'Content-Type': 'application/json'
});

// Post: auth user and get user token
export const getUserToken = async (body, headers) =>
	await Axios.post('/api/auth', body, { headers });

// GET: user data
export const getUserData = async headers =>
	await Axios.get('/api/auth', { headers });

// POST: signup user
export const signupUser = async (body, headers) =>
	await Axios.post('/api/users', body, { headers });

// GET: all posts
export const getAllPosts = async headers =>
	await Axios.get('/api/posts', { headers });

// POST: single post
export const createPost = async (body, headers) =>
	await Axios.post('/api/posts', body, { headers });

// DELETE: single post
export const deletePost = async (postId, headers) =>
	await Axios.delete(`/api/posts/${postId}`, { headers });

// PUT: create comment
export const createComment = async (postId, body, headers) =>
	await Axios.put(`/api/posts/comment/${postId}`, body, { headers });

// DELETE: single comment
export const deleteComment = async (headers, postId, commentId) =>
	await Axios.delete(`/api/posts/comment/${postId}/${commentId}`, { headers });

// GET: all profiles
export const getAllProfiles = async headers =>
	await Axios.get('/api/profile', { headers });

// GET: user profile
export const getUserProfile = async headers =>
	await Axios.get('/api/profile/me', { headers });

// POST: create user profile
export const createUserProfile = async (body, headers) =>
	await Axios.post('/api/profile', body, { headers });

// PUT: like
export const likePost = async (postId, headers) =>
	await Axios.put(`/api/posts/like/${postId}`, null, { headers });

// PUT: unlike
export const unlikePost = async (postId, headers) =>
	await Axios.put(`/api/posts/unlike/${postId}`, null, { headers });

// ADD: experience
export const addProfileExperience = async (body, headers) =>
	Axios.put('/api/profile/experience', body, { headers });

// ADD: education
export const addProfileEducation = async (body, headers) =>
	Axios.put('/api/profile/education', body, { headers });

// DELETE: experience
export const deleteProfileExperience = async (expId, headers) =>
	Axios.delete(`/api/profile/experience/${expId}`, {
		headers
	});

// DELETE: education
export const deleteProfileEducation = async (expId, headers) =>
	Axios.delete(`/api/profile/education/${expId}`, {
		headers
	});

//  DELETE: account
export const deleteAccount = async headers =>
	Axios.delete('/api/profile', { headers });
