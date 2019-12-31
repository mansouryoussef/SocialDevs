// Creates a header object
export const createAuthHeader = token => ({
	'x-auth-token': token,
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': true
});
