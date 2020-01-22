import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PostContextProvider } from './contexts/PostContext';
import { UserContextProvider } from './contexts/UserContext';
import { ProfileContextProvider } from './contexts/ProfileContext';
import { LoadingContextProvider } from './contexts/LoadingContext';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
	<Router>
		<LoadingContextProvider>
			<AuthContextProvider>
				<PostContextProvider>
					<UserContextProvider>
						<ProfileContextProvider>
							<Route component={App} />
						</ProfileContextProvider>
					</UserContextProvider>
				</PostContextProvider>
			</AuthContextProvider>
		</LoadingContextProvider>
	</Router>,
	document.getElementById('root')
);
