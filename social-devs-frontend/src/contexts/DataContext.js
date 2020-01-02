// @TODO refactor this into separate many contexts. e.g. userContext, loadingContext, profileContext. etc..
// @TODO consider using useReducer() to update context. Ahmed has a great blog post about this => nordschool.com

import React, { createContext, useState, useEffect } from 'react';
import { getAllProfiles } from '../service/profile';
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';
import {
	getUserDataReq,
	getAllPostsReq,
	createAuthHeader,
	getUserProfileReq
} from '../service/api';

export const DataContext = createContext();

export function DataContextProvider(props) {
	const [isLoading, setIsLoading] = useState(true);

	const [isLoggedin, setIsLoggedin] = useState(token !== null);

	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [userProfile, setUserProfile] = useState([]);

	// @TODO consider refactoring this:
	// 1. add token as a variable
	// 2. set loading state outside this function.
	// 3. move setting posts outside of this function.

	// The logic is that functions should do only one thing
	const getInitialData = async () => {
		try {
			const token = window.localStorage.getItem('userToken');
			const headers = createAuthHeader(token);
			// console.log(getAllPostsReq(headers));

			const userData = await getUserDataReq(headers);
			const posts = await getAllPostsReq(headers);
			const userProfile = await getUserProfileReq(headers);

			setPosts(posts.data);
			setUserProfile(userProfile.data);
			setUser(userData.data);

			setIsLoggedin(true);
		} catch (error) {
			console.log(error);
		}
	};

	// The logic is that functions should do only one thing

	// You can use it like this:
	// try {
	// 	setIsLoading(true)
	// 	const posts = await getPosts();
	// 	setIsLoading(false)
	// 	setPosts(posts)
	// } catch (error) {

	// }

	// The logic is that functions should do only one thing

	useEffect(() => {
		setIsLoading(true);

		if (token) {
			getInitialData();
		}

		getAllProfiles(setProfiles, setIsLoading);
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
				profiles,
				userProfile,
				setUserProfile,
				getInitialData
			}}>
			{props.children}
		</DataContext.Provider>
	);
}
