import React, { useState, createContext, useEffect, useContext } from 'react';
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';
import { handlGetUserData } from '../service/user';
import { AuthContext } from './AuthContext';
export const UserContext = createContext();

export function UserContextProvider({ children }) {
	const [user, setUser] = useState({});
	const { isLoggedin } = useContext(AuthContext);

	useEffect(() => {
		if (token) {
			try {
				handlGetUserData(setUser);
			} catch (error) {
				console.log(error);
			}
		}
	}, [isLoggedin]);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
