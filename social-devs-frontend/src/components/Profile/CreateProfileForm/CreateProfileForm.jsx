import React, { useState, useContext } from 'react';
import Styles from './CreateProfileForm.module.scss';
import Button from 'components/Shared/Buttons/Button/Button';
import { DataContext } from 'contexts/DataContext';
import { handleCreateProfile } from '../../../service/profile';

export default function CreateProfileForm({ setShowEditForm }) {
	const { userProfile, setUserProfile } = useContext(DataContext);
	const [errMsg, setErrMsg] = useState('');

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

	// Destructure profile fields
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

	return (
		<form className={Styles.createProfileForm}>
			<div className={Styles.inputsContainer}>
				<label>Title*</label>

				<input
					value={title}
					onChange={e => handleChange(e)}
					name='title'
					type='text'
					placeholder='Front-end developer'
				/>
			</div>

			<div className={Styles.inputsContainer}>
				<label>Skills*</label>
				<input
					id='skills'
					value={skills}
					onChange={e => handleChange(e)}
					name='skills'
					type='text'
					placeholder='Javascript,css,html'
				/>
			</div>

			<div className={Styles.inputsContainer}>
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

			<div className={Styles.inputsContainer}>
				<label>Website</label>
				<input
					id='website'
					value={website}
					onChange={e => handleChange(e)}
					name='website'
					type='text'
					placeholder='https://example.com'
				/>
			</div>

			<div className={Styles.inputsContainer}>
				<label>Github</label>
				<input
					id='github'
					value={githubusername}
					onChange={e => handleChange(e)}
					name='githubusername'
					type='text'
					placeholder='https://github.com/username'
				/>
			</div>

			<div className={Styles.inputsContainer}>
				<label>Linkedin</label>
				<input
					id='linkedin'
					value={linkedin}
					onChange={e => handleChange(e)}
					name='linkedin'
					type='text'
					placeholder='https://linkedin.com/in/someone/'
				/>
			</div>

			<div className={Styles.inputsContainer}>
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

			<div className={Styles.textareaContainer}>
				<label>Bio</label>

				<textarea
					id='bio'
					value={bio}
					onChange={e => handleChange(e)}
					name='bio'
					placeholder='I run after rabbits...'
				/>
			</div>

			<p className={Styles.errorMsg}>{errMsg}</p>

			<Button
				text='Save'
				onClick={() =>
					handleCreateProfile(
						profileFields,
						setUserProfile,
						setShowEditForm,
						setErrMsg
					)
				}
				filled
			/>
		</form>
	);
}
