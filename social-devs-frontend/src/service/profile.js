import {
	createAuthHeader,
	addProfileExperience,
	addProfileEducation,
	deleteProfileExperience,
	deleteProfileEducation,
	getUserProfile,
	getAllProfiles,
	deleteAccount,
	createUserProfile
} from './api';

// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

//  Fetches: user profile data
export const handleGetAllProfiles = async (setProfiles, setIsLoading) => {
	try {
		const headers = createAuthHeader();

		const res = await getAllProfiles({ ...headers });

		setProfiles(res.data);
		setIsLoading(false);
	} catch (error) {
		console.log(error);
	}
};

//  Handler: fetches user profile data
export const handleGetUserProfile = async setUserProfile => {
	try {
		const headers = createAuthHeader(token);

		const res = await getUserProfile(headers);

		setUserProfile(res.data);
	} catch (error) {
		console.log(error);
	}
};

//  Handler: create profile
export const handleCreateProfile = async (
	profileFields,
	setUserProfile,
	setShowEditForm,
	setErrMsg,
	event
) => {
	try {
		event.preventDefault();

		const headers = createAuthHeader(token);

		const body = JSON.stringify(profileFields);

		const res = await createUserProfile(body, { ...headers });

		setUserProfile(res.data);
		handleGetUserProfile(setUserProfile);

		setShowEditForm(false);
	} catch (error) {
		error.response.data.errors
			? setErrMsg(error.response.data.errors[0].msg)
			: console.log(error);
	}
};

//  Handler: delete experience
export const handleDeleteExp = async (expId, setUserProfile) => {
	try {
		const headers = createAuthHeader(token);

		const res = await deleteProfileExperience(expId, headers);

		setUserProfile(res.data);
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
	} catch (error) {
		console.error(error.response.data);
	}
};

// Handler: add experience
export const handleAddExp = async (
	fields,
	setUserProfile,
	setAddingExp,
	setError
) => {
	try {
		const headers = createAuthHeader(token);
		const body = JSON.stringify(fields);

		console.log('Exp:');
		console.log('Body:', body);
		console.log('Fields:', fields);
		console.log('Headers:', headers);

		const res = await addProfileExperience(body, { ...headers });

		setUserProfile(res.data);
		setError('');
		setAddingExp(false);
	} catch (error) {
		console.error(error);
	}
};

// Handler: add education
export const handleAddEdu = async (
	fields,
	setUserProfile,
	setAddingEdu,
	setError
) => {
	try {
		const headers = createAuthHeader(token);

		const body = JSON.stringify(fields);

		console.log('Edu:');
		console.log('Body:', body);
		console.log('Fields:', fields);
		console.log('Headers:', headers);
		const res = await addProfileEducation(body, { ...headers });

		setUserProfile(res.data);
		setError('');
		setAddingEdu(false);
	} catch (error) {
		console.error(error);
	}
};

// Handler: delete account
export const handleDeleteAccount = async setIsLoggedin => {
	try {
		const headers = createAuthHeader(token);

		await deleteAccount({ ...headers });

		window.localStorage.removeItem('socialDevsUserToken');

		setIsLoggedin(false);
		window.location.reload();
	} catch (error) {
		console.error(error);
	}
};
