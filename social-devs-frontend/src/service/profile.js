import {
	createAuthHeader,
	addProfileExperience,
	addProfileEducation,
	deleteProfileExperience,
	deleteProfileEducation,
	getUserProfileReq,
	getAllProfilesReq,
	deleteAccount
} from './api';

// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

//  Fetches: user profile data
export const getAllProfiles = async (setProfiles, setIsLoading) => {
	try {
		const headers = createAuthHeader();

		const res = await getAllProfilesReq({ ...headers });

		setProfiles(res.data);
		setIsLoading(false);
	} catch (error) {
		setIsLoading(false);
		console.log(error);
	}
};

//  Fetches: user profile data
export const getUserProfile = async (setUserProfile, setIsLoading) => {
	try {
		const headers = createAuthHeader(token);

		const res = await getUserProfileReq(headers);

		setUserProfile(res.data);
	} catch (error) {
		console.log(error);
	}
};

//  Handler: delete experience
export const handleDeleteExp = async (expId, setUserProfile) => {
	try {
		const headers = createAuthHeader(token);

		const res = await deleteProfileExperience(expId, headers);

		setUserProfile(res.data);
		console.log(res);
	} catch (error) {
		console.error(error.response.data);
	}
};

//  Handler: delete education
export const handleDeleteEdu = async (expId, setUserProfile) => {
	try {
		const headers = createAuthHeader(token);

		const res = await deleteProfileEducation(expId, headers);

		setUserProfile(res.data);
		console.log(res);
	} catch (error) {
		console.error(error.response.data);
	}
};

// Handler: add experience
export const handleAddExp = async (fields, setUserProfile, setAddingExp) => {
	try {
		const headers = createAuthHeader(token);
		const body = JSON.stringify(fields);
		const res = await addProfileExperience(body, { ...headers });

		console.log(res);
		setUserProfile(res.data);

		setAddingExp(false);
	} catch (error) {
		console.error(error);
	}
};

// Handler: add education
export const handleAddEdu = async (fields, setUserProfile, setAddingEdu) => {
	try {
		const headers = createAuthHeader(token);
		console.log(token);
		const body = JSON.stringify(fields);
		const res = await addProfileEducation(body, { ...headers });

		console.log(res);
		setUserProfile(res.data);
		setAddingEdu(false);
	} catch (error) {
		console.error(error);
	}
};

// Handler: delete account
export const handleDeleteAccount = async (setIsLoggedin, history) => {
	try {
		const headers = createAuthHeader(token);

		const res = await deleteAccount({ ...headers });

		window.localStorage.removeItem('userToken');

		setIsLoggedin(false);
		window.location.reload();
		console.log(res);
	} catch (error) {
		console.error(error);
	}
};
