import React, { useContext, useState, useEffect } from 'react';
import Styles from './Profile.module.scss';

import deleteprofile from 'assets/img/icons/deleteprofile.svg';
import CreateProfileForm from 'components/Profile/CreateProfileForm/CreateProfileForm';
import ProfileTable from 'components/Profile/ProfileTable/ProfileTable';
import ProfileInfoList from 'components/Profile/ProfileInfoList/ProfileInfoList';
import IconButtonDanger from 'components/Shared/Buttons/IconButtonDanger/IconButtonDanger';
import Disclaimer from 'components/Shared/Disclaimer/Disclaimer';
import { DataContext } from 'contexts/DataContext';
import { useHistory } from 'react-router-dom';
import { handleDeleteAccount } from 'service/profile';

export default function Profile() {
	const history = useHistory();

	const { userProfile, setIsLoggedin, user } = useContext(DataContext);
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

				<ProfileTable info={expTableProps} />
				<ProfileTable info={eduTableProps} />

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

				{isGuest && (
					<Disclaimer err='Sorry, guests are not allowed to delete their accounts for others to use it.' />
				)}
			</div>
		</div>
	);
}
