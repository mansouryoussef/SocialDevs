import React, { useState, useContext } from 'react';
import './CreateProfileFormStyles.scss';
import Button from '../../Button/Button';
import Axios from 'axios';
import { DataContext } from '../../../contexts/DataContext';

export default function CreateProfileForm({ setShowEditForm }) {
	const { userProfile, setUserProfile } = useContext(DataContext);
	const [errMsg, setErrMsg] = useState();

	const [profileFields, setProfileFields] = useState({
		title: userProfile.title || '',
		location: userProfile.location || '',
		skills: userProfile.skills ? userProfile.skills.join(',') : '',
		website: userProfile.website || '',
		githubusername: userProfile.githubusername || '',
		twitter: userProfile.twitter || '',
		linkedin: userProfile.linkedin || '',
		bio: userProfile.bio || ''
	});

	const handleChange = e => {
		setProfileFields({ ...profileFields, [e.target.name]: e.target.value });
	};

	// destructure profile fields
	const {
		title,
		location,
		skills,
		website,
		githubusername,
		twitter,
		linkedin,
		bio
	} = profileFields;

	const handleCreateProfile = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			console.log(profileFields);

			const body = JSON.stringify(profileFields);

			const res = await Axios.post('/api/profile', body, config);
			setUserProfile({ ...res.data });
			setShowEditForm(false);
		} catch (error) {
			setErrMsg(error.response.data.errors[0].msg);
		}
	};

	return (
		<form className='profile-page__content__create-profile-form'>
			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Title*</label>

				<input
					value={title}
					onChange={e => handleChange(e)}
					name='title'
					type='text'
					placeholder='Front-end developer'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Skills*</label>
				<input
					id='skills'
					value={skills}
					onChange={e => handleChange(e)}
					name='skills'
					type='text'
					type='text'
					placeholder='Javascript,css,html'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Location</label>

				<input
					id='location'
					value={location}
					onChange={e => handleChange(e)}
					name='location'
					type='text'
					placeholder='City, Country'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Website</label>
				<input
					id='website'
					value={website}
					onChange={e => handleChange(e)}
					name='website'
					type='text'
					placeholder='example.fi'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Github</label>
				<input
					id='github'
					value={githubusername}
					onChange={e => handleChange(e)}
					name='githubusername'
					type='text'
					placeholder='javasciptmaster'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Linkedin</label>
				<input
					id='linkedin'
					value={linkedin}
					onChange={e => handleChange(e)}
					name='linkedin'
					type='text'
					placeholder='linkedin.com/in/someone/'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__input-container'>
				<label>Twitter</label>
				<input
					id='twitter'
					value={twitter}
					onChange={e => handleChange(e)}
					name='twitter'
					type='text'
					placeholder='twitter.com/Twitter'
				/>
			</div>

			<div className='profile-page__content__create-profile-form__textarea-container'>
				<label>Bio</label>
				<textarea
					id='bio'
					value={bio}
					onChange={e => handleChange(e)}
					name='bio'
					placeholder='I run after rabbits...'
				/>
			</div>
			<p className='profile-page__content__create-profile-form__msg'>
				{errMsg}
			</p>
			<Button sm text='Save' onClick={handleCreateProfile} highlight />
		</form>
	);
}
