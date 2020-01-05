import React, { useContext } from 'react';
import './UsersStyles.scss';
import { DataContext } from '../../contexts/DataContext';
import UserCard from '../../components/UserCard/UserCard';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

export default function Users() {
	const { profiles, userProfile, isLoggedin } = useContext(DataContext);

	return (
		<div className='users-page'>
			<h1 className='users-page__title'>Users</h1>

			<div className='users-page__users-container'>
				{profiles.map(profile => {
					const { user, skills, location, title } = profile;

					return (
						<UserCard
							key={user._id}
							name={user.name.split(' ')[0]}
							title={title}
							location={location}
							skills={skills}
							userId={user._id}
						/>
					);
				})}
				{!userProfile.title && isLoggedin && (
					<Disclaimer err='Your account will be added when you create a profile.' />
				)}
			</div>
		</div>
	);
}
