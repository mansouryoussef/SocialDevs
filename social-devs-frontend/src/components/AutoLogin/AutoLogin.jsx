import React, { useContext } from 'react';
import './AutoLoginStyles.scss';
import { DataContext } from '../../contexts/DataContext';
import { handleLogin } from '../../service/auth';
import { useHistory } from 'react-router-dom';

export default function AutoLogin({ setErrorMsg }) {
	let history = useHistory();

	const { setIsLoggedin, getInitialData } = useContext(DataContext);

	const loginData = {
		email: 'demo@guest.fi',
		password: '123456'
	};
	return (
		<span
			onClick={e => {
				handleLogin(
					e,
					loginData,
					getInitialData,
					setIsLoggedin,
					history,
					setErrorMsg
				);
			}}
			className='auto-login-container'>
			Auto Login as a guest.
		</span>
	);
}
