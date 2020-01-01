import { getUserDataReq } from './api';

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
