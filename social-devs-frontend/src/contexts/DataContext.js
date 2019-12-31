// @TODO refactor this into separate many contexts. e.g. userContext, loadingContext, profileContext. etc..
// @TODO consider using useReducer() to update context. Ahmed has a great blog post about this => nordschool.com

import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const DataContext = createContext();

export function DataContextProvider(props) {
	const [isLoading, setIsLoading] = useState(
		window.localStorage.getItem('userToken') !== null
	);

	const [isLoggedin, setIsLoggedin] = useState(false);
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
			setIsLoading(true);

			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			const res = await Axios.get('/api/auth', config);

			setUser(res.data);

			setIsLoading(false);
			setIsLoggedin(true);
		} catch (error) {
			console.log(error);
		}
		// console.log('User:', res.data);
	};

	// @TODO consider refactoring this:
	// 1. add token as a variable
	// 2. set loading state outside this function.
	// 3. move setting posts outside of this function.

	// The logic is that functions should do only one thing
	const getPosts = async () => {
		try {
			setIsLoading(true);

			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			const res = await Axios.get('/api/posts', config);

			setPosts(res.data);

			setIsLoading(false);

			// console.log('Posts:', res.data);
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
			setIsLoading(true);

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
			setIsLoading(true);
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Access-Control-Allow-Origin': '*'
				}
			};

			const res = await Axios.get('/api/profile/me', config);

			setUserProfile(res.data);

			setHasProfile(true);
			// setUserExperience(res.data.experience);
			setIsLoading(false);

			console.log('User Profile:', res.data.experience);
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		getProfiles();
		if (window.localStorage.getItem('userToken') !== null) {
			getUserData();
			getPosts();
			getUserProfile();
		}
	}, []);

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
