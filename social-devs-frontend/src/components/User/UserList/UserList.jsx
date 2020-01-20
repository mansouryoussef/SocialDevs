import React from 'react';
import Styles from './UserList.module.scss';
import UserCard from 'components/User/UserCard/UserCard';

export default function UserList({ profiles }) {
	return (
		<div className={Styles.userListContainer}>
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
		</div>
	);
}
