import React, { createContext, useState, useContext, useEffect } from 'react';
import { handleGetAllPosts } from '../service/post';
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';
import { LoadingContext } from './LoadingContext';
export const PostContext = createContext();

export function PostContextProvider({ children }) {
	const { setIsLoading } = useContext(LoadingContext);

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (token) {
			try {
				handleGetAllPosts(setPosts, setIsLoading);
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return (
		<PostContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostContext.Provider>
	);
}
