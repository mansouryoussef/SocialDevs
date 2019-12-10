import React from 'react';
import './UsersStyles.scss';
import Nav from '../../components/Nav/Nav';
import UserCard from '../../components/UserCard/UserCard';

export default function Users() {
	return (
		<div className='users-page'>
			<Nav />
			<h1 className='users-page__title'>Users</h1>

			<div className='users-page__users-container'>
				<UserCard />
				<UserCard />
				<UserCard />
			</div>
		</div>
	);
}
