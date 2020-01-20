import React, { useContext } from 'react';
import Styles from './Users.module.scss';
import { DataContext } from 'contexts/DataContext';
import Disclaimer from 'components/Shared/Disclaimer/Disclaimer';
import UserList from '../../components/User/UserList/UserList';

export default function Users() {
	const { profiles, userProfile, isLoggedin } = useContext(DataContext);

	return (
		<div className={Styles.usersPage}>
			<h1 className={Styles.title}>Users</h1>

			<UserList profiles={profiles} />

			{!userProfile.title && isLoggedin && (
				<Disclaimer err='Your account will be added when you create a profile.' />
			)}
		</div>
	);
}
