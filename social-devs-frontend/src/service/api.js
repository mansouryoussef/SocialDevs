import Axios from 'axios';

export const createAuthHeader = token => ({
	'x-auth-token': token,
	'Content-Type': 'application/json'
});

export const deleteProfileExperience = async (expId, headers) =>
	Axios.delete(`/api/profile/experience/${expId}`, {
		headers
	});
