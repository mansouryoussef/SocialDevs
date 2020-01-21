import React, { useState, useContext } from 'react';
import Styles from './CreateProfileForm.module.scss';
import Button from 'components/Shared/Buttons/Button/Button';
import { DataContext } from 'contexts/DataContext';
import { handleCreateProfile } from '../../../service/profile';
import FormField from './FormField/FormField';

export default function CreateProfileForm({ setShowEditForm, showEditForm }) {
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
			<FormField
				name='title'
				value={title}
				placeholder='Front-end developer'
				required
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='skills'
				value={skills}
				placeholder='Javascript,css,html'
				required
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='location'
				value={location}
				placeholder='City, Country'
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='website'
				value={website}
				placeholder='https://example.com'
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='githubusername'
				value={githubusername}
				placeholder='https://github.com/username'
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='linkedin'
				value={linkedin}
				placeholder='https://linkedin.com/in/someone/'
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='twitter'
				value={twitter}
				placeholder='twitter.com/Twitter'
				onChange={e => handleChange(e)}
			/>

			<FormField
				name='bio'
				value={bio}
				placeholder='I run after rabbits...'
				textarea
				onChange={e => handleChange(e)}
			/>

			<p className={Styles.errorMsg}>{errMsg}</p>

			<div className={Styles.btnsContainer}>
				<Button
					text='Cancel'
					onClick={event => {
						setShowEditForm(false);
					}}
				/>

				<Button
					text='Save'
					filled
					onClick={event => {
						handleCreateProfile(
							profileFields,
							setUserProfile,
							setShowEditForm,
							setErrMsg,
							event
						);
					}}
				/>
			</div>
		</form>
	);
}
