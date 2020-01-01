// @TODO refactor this into separate many contexts. e.g. userContext, loadingContext, profileContext. etc..
// @TODO consider using useReducer() to update context. Ahmed has a great blog post about this => nordschool.com

import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const DataContext = createContext();

export function DataContextProvider(props) {
	const [isLoading, setIsLoading] = useState(true);

	const [isLoggedin, setIsLoggedin] = useState(
		window.localStorage.getItem('userToken') !== null
	);
	// @TODO consider removing this when object/array bug is resolved.
	const [hasProfile, setHasProfile] = useState(false);

	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [userProfile, setUserProfile] = useState([]);
	// @TODO consider removing this when object/array bug is resolved.

	// @TODO consider refactoring this:
	// 1. add token as a variable
	// 2. set loading state outside this function.
	// 3. move setting posts outside of this function.

	// The logic is that functions should do only one thing
	const getUserData = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			const userData = await Axios.get('/api/auth', config);
			const posts = await Axios.get('/api/posts', config);
			const userProfile = await Axios.get('/api/profile/me', config);

			setUser(userData.data);
			setUserProfile(userProfile.data);
			setPosts(posts.data);

			setIsLoggedin(true);
		} catch (error) {
			console.log(error);
		}
	};

	// @TODO consider refactoring this:
	// 1. add token as a variable
	// 2. set loading state outside this function.
	// 3. move setting posts outside of this function.

	// The logic is that functions should do only one thing
	const getPosts = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			const res = await Axios.get('/api/posts', config);

			setPosts(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	// const getPosts = async (token) => {
	// 		const config = {
	// 			headers: {
	// 				'x-auth-token': token
	// 			}
	// 		};

	// 		const res = await Axios.get('/api/posts', config);
	// };

	// You can use it like this:
	// try {
	// 	setIsLoading(true)
	// 	const posts = await getPosts();
	// 	setIsLoading(false)
	// 	setPosts(posts)
	// } catch (error) {

	// }

	// @TODO consider refactoring this:
	// 1. add token as a variable
	// 2. set loading state outside this function.
	// 3. move setting posts outside of this function.

	// The logic is that functions should do only one thing
	const getProfiles = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			const res = await Axios.get('/api/profile', config);

			setProfiles(res.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	// @TODO consider refactoring this:
	// 1. add token as a variable
	// 2. set loading state outside this function.
	// 3. move setting posts outside of this function.

	// The logic is that functions should do only one thing
	const getUserProfile = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Access-Control-Allow-Origin': '*'
				}
			};

			const res = await Axios.get('/api/profile/me', config);

			setUserProfile(res.data);

			setHasProfile(true);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		if (window.localStorage.getItem('userToken') !== null) {
			getUserData();
			// getPosts();
			// getUserProfile();
		}
		getProfiles();
	}, [isLoggedin]);

	return (
		<DataContext.Provider
			value={{
				posts,
				user,
				setIsLoading,
				isLoading,
				isLoggedin,
				setIsLoggedin,
				setPosts,
				getPosts,
				profiles,
				userProfile,
				getUserProfile,
				setUserProfile
			}}>
			{props.children}
		</DataContext.Provider>
	);
}
