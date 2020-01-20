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

import { getAllPosts } from '../service/post';

export const DataContext = createContext();

export function DataContextProvider(props) {
	const [isLoading, setIsLoading] = useState(true);

	const [isLoggedin, setIsLoggedin] = useState(token !== null);

	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [userProfile, setUserProfile] = useState({});

	const getInitialData = async () => {
		try {
			setIsLoading(true);
			const headers = createAuthHeader(token);

			try {
				const userData = await getUserDataReq(headers);
				setUser(userData.data);
			} catch (error) {
				console.log(error);
			}

			try {
				const posts = await getAllPostsReq(headers);
				setPosts(posts.data);
			} catch (error) {
				console.log(error);
			}

			try {
				const userProfile = await getUserProfileReq(headers);
				setUserProfile(userProfile.data);
			} catch (error) {
				console.log(error);
			}

			setIsLoggedin(true);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
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

	useEffect(() => {
		getAllProfiles(setProfiles, setIsLoading);
	}, [userProfile]);

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
				setProfiles,
				userProfile,
				setUserProfile,
				getInitialData,
				getAllPosts
			}}>
			{props.children}
		</DataContext.Provider>
	);
}
