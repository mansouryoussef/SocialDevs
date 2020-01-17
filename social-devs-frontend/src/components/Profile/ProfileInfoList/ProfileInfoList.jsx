import React, { useContext } from 'react';
import './ProfileInfoListStyles.scss';
import { DataContext } from 'contexts/DataContext';
import Button from 'components/Shared/Buttons/Button/Button';
import { createSkillsStr } from 'service/helpers.js';
export default function ProfileInfoList({ setShowEditForm }) {
	const { userProfile } = useContext(DataContext);

	const {
		title,
		skills,
		location,
		website,
		githubusername,
		linkedin,
		twitter,
		bio
	} = userProfile;

	const skillsList =
		skills &&
		skills.map((skill, i, arr) => {
			if (arr.length === 1 || arr.length === i + 1) {
				return skill;
			}

			if (arr.length >= 1) {
				return skill + ', ';
			}
		});

	const isSet = str => (str === undefined || null || '' ? 'Not set!' : str);

	return (
		<div className='profile-infolist'>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Title:</h3>
				<p className='profile-infolist__item__info'>{title}</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Skills:</h3>
				<p className='profile-infolist__item__info'>
					{createSkillsStr(skills)}
				</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Location:</h3>
				<p className='profile-infolist__item__info'>{isSet(location)}</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Website:</h3>
				<p className='profile-infolist__item__info'>{isSet(website)}</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Github:</h3>
				<p className='profile-infolist__item__info'>{isSet(githubusername)}</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Linkedin:</h3>
				<p className='profile-infolist__item__info'>{isSet(linkedin)}</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Twitter:</h3>
				<p className='profile-infolist__item__info'>{isSet(twitter)}</p>
			</div>
			<div className='profile-infolist__item'>
				<h3 className='profile-infolist__item__title'>Bio:</h3>
				<p className='profile-infolist__item__info__bio'>{isSet(bio)}</p>
			</div>
			<Button onClick={() => setShowEditForm(true)} filled text='Edit info' />
		</div>
	);
}
