import React, { createContext, useState, useContext, useEffect } from 'react';
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';
import { handleGetUserProfile, handleGetAllProfiles } from '../service/profile';
import { LoadingContext } from './LoadingContext';

export const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
	const { setIsLoading } = useContext(LoadingContext);

	const [profiles, setProfiles] = useState([]);
	const [userProfile, setUserProfile] = useState({});

	useEffect(() => {
		if (token) {
			try {
				handleGetUserProfile(setUserProfile);
			} catch (error) {
				console.log(error);
			}
		}

		try {
			handleGetAllProfiles(setProfiles, setIsLoading);
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<ProfileContext.Provider
			value={{ profiles, setProfiles, userProfile, setUserProfile }}>
			{children}
		</ProfileContext.Provider>
	);
}
