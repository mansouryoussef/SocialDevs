import React from 'react';
import './UserCardStyles.scss';
import Button from '../Button/Button';
import person from '../../assets/img/person.jpg';

export default function UserCard() {
	return (
		<div className='usercard-container'>
			<div className='usercard-container__img-cropper'>
				<img
					className='usercard-container__img'
					src={person}
					alt="User's img"
				/>
			</div>
			<div className='usercard-container__user-info'>
				<h2 className='usercard-container__user-info__name'>John</h2>
				<p className='usercard-container__user-info__title'>Web developer</p>
				<p className='usercard-container__user-info__location'>
					Baixa, Mozambique
				</p>
				<Button text='View' highlight sm />
			</div>
			<div className='usercard-container__skills'>
				<div className='usercard-container__skills__skill'>
					<span>{'</> '}</span>React
				</div>
				<div className='usercard-container__skills__skill'>
					<span>{'</> '}</span>Node
				</div>
				<div className='usercard-container__skills__skill'>
					<span>{'</> '}</span>NoSQL
				</div>
			</div>
		</div>
	);
}
