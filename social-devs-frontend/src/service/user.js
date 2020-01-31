import { getUserData, createAuthHeader } from './api';

// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

//  Handler: fetches user data
export const handlGetUserData = async setUser => {
	try {
		const headers = createAuthHeader(token);

		const res = await getUserData(headers);

		setUser(res.data);
	} catch (error) {
		console.log(error);
	}
};

// Returns user's first name.
export const getFirstName = name => name.split(' ')[0];
