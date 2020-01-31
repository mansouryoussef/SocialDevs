import React from 'react';
import Styles from './UserHeader.module.scss';
import userDefaultImg from 'assets/img/icons/user.svg';
import UserHeaderLinks from './UserHeaderLinks/UserHeaderLinks';

export default function UserHeader({ profile }) {
	const {
		user,
		title,
		location,
		twitter,
		linkedin,
		website,
		githubusername
	} = profile;

	const links = {
		twitter,
		website,
		linkedin,
		githubusername
	};

	return (
		<div className={Styles.userHeader}>
			<img src={userDefaultImg} alt="User's img" className={Styles.userImg} />

			<h2 className={Styles.userName}>{user.name}</h2>

			<p className={Styles.userTitle}>{title}</p>

			<p className={Styles.userLocation}>{location}</p>

			{!!links && <UserHeaderLinks links={links} />}
		</div>
	);
}
