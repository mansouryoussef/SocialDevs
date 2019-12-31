import React, { useState, useContext } from 'react';
import './ProfileStyles.scss';
import Button from '../../components/Button/Button';
import deleteprofile from '../../assets/img/icons/deleteprofile.svg';
import { DataContext } from '../../contexts/DataContext';
import Axios from 'axios';
import CreateProfileForm from '../../components/Profile/CreateProfileForm/CreateProfileForm';
import { useHistory } from 'react-router-dom';
import ProfileTable from '../../components/Profile/ProfileTable/ProfileTable';
import { handleDeleteAccount } from '../../service/profile';

export default function Profile() {
	const { userProfile, setUserProfile, setIsLoggedin } = useContext(
		DataContext
	);

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

	const handleDeleteEdu = async eduId => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			const res = await Axios.delete(`/api/profile/education/${eduId}`, config);

			setUserProfile(res.data);
			console.log(res);
		} catch (error) {
			console.error(error.response.data);
		}
	};

	return (
		<div className='profile-page'>
			<h1 className='profile-page__title'>Profile</h1>
			<div className='profile-page__content'>
				<CreateProfileForm />

				<ProfileTable info={expTableProps} />
				<ProfileTable info={eduTableProps} />

				<Button
					icon={deleteprofile}
					onClick={() => {
						handleDeleteAccount(setIsLoggedin, history);
					}}
					danger
					text='Delete my account'
					sm
				/>
			</div>
		</div>
	);
}
