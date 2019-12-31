import Axios from 'axios';
import { createAuthHeader } from './api';

export const deleteProfileExperience = async (expId, headers) =>
	Axios.delete(`/api/profile/experience/${expId}`, {
		headers
	});

export const addProfileExperience = async (body, headers) =>
	Axios.put('/api/profile/experience', body, headers);

export const addProfileEducation = async (body, headers) =>
	Axios.put('/api/profile/education', body, headers);

export const deleteAccount = async headers =>
	Axios.delete('/api/profile', headers);

export const handleDeleteExp = async (expId, setUserProfile) => {
	try {
		const token = window.localStorage.getItem('userToken');
		const headers = createAuthHeader(token);

		const res = await deleteProfileExperience(expId, headers);

		setUserProfile(res.data);
		console.log(res);
	} catch (error) {
		console.error(error.response.data);
	}
};

export const handleAddExp = async (fields, getUserProfile, setAddingExp) => {
	try {
		const token = window.localStorage.getItem('userToken');
		const headers = createAuthHeader(token);
		const body = JSON.stringify(fields);
		const res = await addProfileExperience(body, { headers });

		console.log(res);
		getUserProfile();
		setAddingExp(false);
	} catch (error) {
		console.error(error.response.data);
	}
};

export const handleAddEdu = async (fields, getUserProfile, setAddingEdu) => {
	try {
		const token = window.localStorage.getItem('userToken');
		const headers = createAuthHeader(token);
		const body = JSON.stringify(fields);
		const res = await addProfileEducation(body, { headers });

		console.log(res);
		getUserProfile();
		setAddingEdu(false);
	} catch (error) {
		console.error(error);
	}
};

export const handleDeleteAccount = async (setIsLoggedin, history) => {
	try {
		const token = window.localStorage.getItem('userToken');
		const headers = createAuthHeader(token);

		const res = await deleteAccount({ headers });

		window.localStorage.removeItem('userToken');

		setIsLoggedin(false);
		history.push('/');
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};
