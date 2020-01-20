import { createAuthHeader, getUserToken } from './api';

// Handler: Sign out process
export const handleSignout = (setIsLoggedin, history) => {
	// Remove token from local storage
	window.localStorage.removeItem('userToken');

	// Is loggedin to false
	setIsLoggedin(false);

	// RedihandleTogglerect user to login page
	history.push('/login');

	// Reload page
	window.location.reload();
};

// Handler: Log in process
export const handleLogin = async (
	e,
	loginData,
	getInitialData,
	setIsLoggedin,
	history,
	setErrorMsg
) => {
	e.preventDefault();

	try {
		const headers = createAuthHeader();

		const body = JSON.stringify(loginData);

		const res = await getUserToken(body, headers);
		console.log(res.data);
		window.localStorage.setItem('userToken', res.data.token);

		getInitialData();
		setIsLoggedin(true);
		history.push('/feed');
	} catch (error) {
		console.log(error);
		setErrorMsg(error.response.data.errors[0].msg);
	}
};
