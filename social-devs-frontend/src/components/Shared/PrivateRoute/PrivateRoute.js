import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { DataContext } from '../../../contexts/DataContext';

export default function PrivateRoute({ component: Component, ...rest }) {
	const { isLoggedin } = useContext(DataContext);

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedin === true ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}
		/>
	);
}
