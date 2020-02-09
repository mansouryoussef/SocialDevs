import React, { useContext, useState, useEffect } from 'react';
import Styles from './Profile.module.scss';

import deleteprofile from 'assets/img/icons/deleteprofile.svg';
import CreateProfileForm from 'components/Profile/CreateProfileForm/CreateProfileForm';
import ProfileTable from 'components/Profile/ProfileTable/ProfileTable';
import ProfileInfoList from 'components/Profile/ProfileInfoList/ProfileInfoList';
import IconButtonDanger from 'components/Shared/Buttons/IconButtonDanger/IconButtonDanger';
import Disclaimer from 'components/Shared/Disclaimer/Disclaimer';
import { handleDeleteAccount } from 'service/profile';
import { UserContext } from 'contexts/UserContext';
import { ProfileContext } from 'contexts/ProfileContext';
import { AuthContext } from '../../contexts/AuthContext';

export default function Profile() {
	const { user } = useContext(UserContext);
	const { setIsLoggedin } = useContext(AuthContext);
	const { userProfile } = useContext(ProfileContext);

	const [showEditForm, setShowEditForm] = useState(
		userProfile.title === undefined
	);

	const [isGuest, setIsGuest] = useState(false);

	useEffect(() => {
		userProfile.title === undefined
			? setShowEditForm(true)
			: setShowEditForm(false);
	}, [userProfile]);

	const expTableProps = {
		type: 'experience',
		headerCells: ['company', 'title', 'duration'],
		itemList: userProfile.experience
	};

	const eduTableProps = {
		type: 'education',
		headerCells: ['school', 'degree', 'duration'],
		itemList: userProfile.education
	};

	return (
		<div className={Styles.profilePage}>
			<h1 className={Styles.title}>Profile</h1>

			<div className={Styles.content}>
				<h2 className={Styles.formTitle}>
					{showEditForm ? 'Create a profile:' : 'Profile information:'}
				</h2>

				{showEditForm ? (
					<CreateProfileForm
						setShowEditForm={setShowEditForm}
						showEditForm={showEditForm}
					/>
				) : (
					<ProfileInfoList setShowEditForm={setShowEditForm} />
				)}

				<ProfileTable cypress='exp_table' info={expTableProps} />
				<ProfileTable cypress='edu_table' info={eduTableProps} />

				<div className={Styles.btnContainer}>
					<IconButtonDanger
						onClick={() => {
							user.name === 'Guest'
								? setIsGuest(true)
								: handleDeleteAccount(setIsLoggedin);
						}}
						icon={deleteprofile}
						text='Delete my account!'
						filled
					/>
				</div>

				{isGuest && (
					<Disclaimer err='Sorry, guests are not allowed to delete their accounts for others to use it.' />
				)}
			</div>
		</div>
	);
}
