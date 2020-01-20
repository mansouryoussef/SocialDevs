import { getUserDataReq, createAuthHeader, signupUser } from './api';

// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

//  Fetches: user data
export const getUserData = async setUser => {
	try {
		const headers = createAuthHeader(token);

		const res = await getUserDataReq(headers);

		setUser(res.data);
	} catch (error) {
		console.log(error);
	}
};

// Returns user's first name.
export const getFirstName = name => name.split(' ')[0];

export const handleUserSignup = async (
	newUser,
	setIsLoggedin,
	history,
	setErrorMsg
) => {
	try {
		const headers = createAuthHeader(token);

		const body = JSON.stringify(newUser);

		const res = await signupUser(body, { ...headers });

		window.localStorage.setItem('userToken', res.data.token);

		setIsLoggedin(true);
		history.push('/feed');
		window.location.reload();
	} catch (error) {
		if (error.response.data !== undefined) {
			setErrorMsg(error.response.data.errors[0].msg);
		}
		console.log(error);
	}
};
