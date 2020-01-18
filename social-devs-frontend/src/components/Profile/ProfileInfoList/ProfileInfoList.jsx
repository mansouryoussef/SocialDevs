import React, { useContext } from 'react';
import Styles from './ProfileInfoList.module.scss';
import { DataContext } from 'contexts/DataContext';
import Button from 'components/Shared/Buttons/Button/Button';
import { createSkillsStr, isSet } from 'service/helpers.js';
import ProfileInfoItem from './ProfileInfoItem/ProfileInfoItem';

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

	return (
		<div className={Styles.profileInfoListContainer}>
			<ProfileInfoItem label='Title:' info={title} />

			<ProfileInfoItem label='Skills:' info={createSkillsStr(skills)} />

			<ProfileInfoItem label='Location:' info={isSet(location)} />

			<ProfileInfoItem label='Website:' info={isSet(website)} />

			<ProfileInfoItem label='Github:' info={isSet(githubusername)} />

			<ProfileInfoItem label='Linkedin:' info={isSet(linkedin)} />

			<ProfileInfoItem label='Twitter:' info={isSet(twitter)} />

			<ProfileInfoItem label='Bio:' info={isSet(bio)} outlined />

			<Button onClick={() => setShowEditForm(true)} filled text='Edit info' />
		</div>
	);
}
