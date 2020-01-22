import React, { useState, createContext, useEffect } from 'react';
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';
import { handlGetUserData } from '../service/user';
export const UserContext = createContext();

export function UserContextProvider({ children }) {
	const [user, setUser] = useState({});

	useEffect(() => {
		if (token) {
			try {
				handlGetUserData(setUser);
			} catch (error) {
				console.log(error);
			}
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
