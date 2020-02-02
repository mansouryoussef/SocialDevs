import { createAuthHeader, getUserToken, signupUser } from './api';
// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

// Handler: Signup in process
export const handleSignup = async (
	newUser,
	setIsLoggedin,
	history,
	setErrorMsg
) => {
	try {
		const headers = createAuthHeader(token);

		const body = JSON.stringify(newUser);

		const res = await signupUser(body, { ...headers });

		window.localStorage.setItem('socialDevsUserToken', res.data.token);

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

// Handler: Log in process
export const handleLogin = async loginData => {
	const headers = createAuthHeader();

	const body = JSON.stringify(loginData);

	const res = await getUserToken(body, headers);

	window.localStorage.setItem('socialDevsUserToken', res.data.token);
};
