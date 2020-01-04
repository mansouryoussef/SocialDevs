// handler: sign out process
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
