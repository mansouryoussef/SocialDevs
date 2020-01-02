import React, { useContext, useState, useEffect } from 'react';
import './ProfileStyles.scss';
import Button from '../../components/Button/Button';
import deleteprofile from '../../assets/img/icons/deleteprofile.svg';
import { DataContext } from '../../contexts/DataContext';
import CreateProfileForm from '../../components/Profile/CreateProfileForm/CreateProfileForm';
import { useHistory } from 'react-router-dom';
import ProfileTable from '../../components/Profile/ProfileTable/ProfileTable';
import { handleDeleteAccount } from '../../service/profile';
import ProfileInfoList from '../../components/Profile/ProfileInfoList/ProfileInfoList';

export default function Profile() {
	const { userProfile, setIsLoggedin } = useContext(DataContext);
	// const [isCreatingProfile, setIsCreatingProfile] = useState(false)
	// const [hasProfile, setHasProfile] = useState(false)
	const [showEditForm, setShowEditForm] = useState(
		userProfile.title === undefined
	);

	useEffect(() => {
		userProfile.title === undefined
			? setShowEditForm(true)
			: setShowEditForm(false);
	}, [userProfile]);

	const history = useHistory();

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
		<div className='profile-page'>
			<h1 className='profile-page__title'>Profile</h1>

			<div className='profile-page__content'>
				<h2 className='profile-page__content__form-title'>
					{!showEditForm ? 'Profile information:' : 'Create a profile:'}
				</h2>

				{showEditForm ? (
					<CreateProfileForm setShowEditForm={setShowEditForm} />
				) : (
					<ProfileInfoList setShowEditForm={setShowEditForm} />
				)}

				<ProfileTable info={expTableProps} />
				<ProfileTable info={eduTableProps} />

				<Button
					icon={deleteprofile}
					onClick={() => {
						handleDeleteAccount(setIsLoggedin, history);
					}}
					danger
					text='Delete my account!'
					sm
				/>
			</div>
		</div>
	);
}
