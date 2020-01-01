import {
	createAuthHeader,
	addProfileExperience,
	addProfileEducation,
	deleteProfileExperience,
	deleteProfileEducation,
	deleteAccount
} from './api';

//  Handler: delete experience
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

//  Handler: delete education
export const handleDeleteEdu = async (expId, setUserProfile) => {
	try {
		const token = window.localStorage.getItem('userToken');
		const headers = createAuthHeader(token);

		const res = await deleteProfileEducation(expId, headers);

		setUserProfile(res.data);
		console.log(res);
	} catch (error) {
		console.error(error.response.data);
	}
};

// Handler: add experience
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

// Handler: add education
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

// Handler: delete account
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
