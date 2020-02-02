import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from 'contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
	const { isLoggedin } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedin === true ? <Component {...props} /> : <Redirect to='/' />
			}
		/>
	);
}
