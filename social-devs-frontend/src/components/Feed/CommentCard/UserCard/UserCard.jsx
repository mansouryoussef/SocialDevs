import React from 'react';
import './UserCardStyles.scss';
import Button from '../../../Button/Button';
import user from '../../../../assets/img/icons/user.svg';

export default function UserCard({
	img,
	name,
	title,
	location,
	skills,
	userId
}) {
	return (
		<div className='usercard-container'>
			<img src={user} className='usercard-container__img' alt="User's img" />

			<div className='usercard-container__user-info'>
				<h2 className='usercard-container__user-info__name'>{name}</h2>
				<p className='usercard-container__user-info__title'>{title}</p>
				<p className='usercard-container__user-info__location'>{location}</p>
				<Button text='View' to={`/user/${userId}`} highlight sm />
			</div>

			<div className='usercard-container__skills'>
				{skills.map(skill => (
					<div className='usercard-container__skills__skill'>
						<span>{'</> '}</span>
						{skill}
					</div>
				))}
			</div>
		</div>
	);
}
