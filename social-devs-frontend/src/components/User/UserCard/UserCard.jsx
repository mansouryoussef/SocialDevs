import React from 'react';
import Styles from './UserCard.module.scss';
import { Link } from 'react-router-dom';
import Button from 'components/Shared/Buttons/Button/Button';
import user from 'assets/img/icons/user.svg';
import UserSkillsList from './UserSkillsList/UserSkillsList';

export default function UserCard({ name, title, location, skills, userId }) {
	return (
		<div data-cy='user_card' className={Styles.userCardContainer}>
			<img src={user} className={Styles.userImg} alt="User's img" />

			<div className={Styles.userInfo}>
				<h2 className={Styles.userName}>{name}</h2>

				<p className={Styles.userTitle}>{title}</p>

				<p className={Styles.userLocation}>{location}</p>

				<Link className='Link' to={`/user/${userId}`}>
					<Button text='View' filled />
				</Link>
			</div>

			<UserSkillsList skills={skills} />
		</div>
	);
}
