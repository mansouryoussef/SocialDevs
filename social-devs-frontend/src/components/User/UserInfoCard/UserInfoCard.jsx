import React from 'react';
import Styles from './UserInfoCard.module.scss';
import UserSkillsList from './UserSkillsList/UserSkillsList';

export default function UserInfoCard({ profile }) {
	const { skills, bio } = profile;

	return (
		<div className={Styles.userInfoCard}>
			<h2 className={Styles.bioTitle}>Bio</h2>

			<p className={Styles.bioText}>{bio}</p>

			<span className={Styles.divider}></span>

			<h2 className={Styles.skillsTitle}>Skills</h2>

			<UserSkillsList skills={skills} />
		</div>
	);
}
