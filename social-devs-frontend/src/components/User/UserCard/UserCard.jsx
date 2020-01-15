import React from 'react';
import './UserCardStyles.scss';
import { Link } from 'react-router-dom';
import Button from 'components/Shared/Buttons/Button/Button';
import user from 'assets/img/icons/user.svg';
import uuid from 'uuid';

export default function UserCard({ name, title, location, skills, userId }) {
	return (
		<div className='usercard-container'>
			<img src={user} className='usercard-container__img' alt="User's img" />

			<div className='usercard-container__user-info'>
				<h2 className='usercard-container__user-info__name'>{name}</h2>
				<p className='usercard-container__user-info__title'>{title}</p>
				<p className='usercard-container__user-info__location'>{location}</p>
				<Link className='Link' to={`/user/${userId}`}>
					<Button text='View' filled />
				</Link>
			</div>

			<div className='usercard-container__skills'>
				{skills.map(skill => (
					<div key={uuid()} className='usercard-container__skills__skill'>
						<span>{'</> '}</span>
						{skill}
					</div>
				))}
			</div>
		</div>
	);
}
