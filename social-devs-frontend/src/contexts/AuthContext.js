import React, { createContext, useState } from 'react';
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [isLoggedin, setIsLoggedin] = useState(token !== null);

	return (
		<AuthContext.Provider
			value={{
				isLoggedin,
				setIsLoggedin
			}}>
			{children}
		</AuthContext.Provider>
	);
}
