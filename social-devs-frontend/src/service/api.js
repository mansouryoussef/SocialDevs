import Axios from 'axios';

// Creates a header object
export const createAuthHeader = token => ({
	'x-auth-token': token,
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': true
});

// ADD: experience
export const addProfileExperience = async (body, headers) =>
	Axios.put('/api/profile/experience', body, headers);

// ADD: education
export const addProfileEducation = async (body, headers) =>
	Axios.put('/api/profile/education', body, headers);

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
	Axios.delete('/api/profile', headers);
