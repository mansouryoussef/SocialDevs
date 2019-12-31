import React, { useContext } from 'react';
import './UsersStyles.scss';
import UserCard from '../../components/UserCard/UserCard';
import { DataContext } from '../../contexts/DataContext';

// Great example!
export default function Users() {
	const { profiles } = useContext(DataContext);

	return (
		<div className='users-page'>
			<h1 className='users-page__title'>Users</h1>

			<div className='users-page__users-container'>
				{profiles.map(profile => {
					const { user, skills, experience, location, title } = profile;
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
			</div>
		</div>
	);
}
