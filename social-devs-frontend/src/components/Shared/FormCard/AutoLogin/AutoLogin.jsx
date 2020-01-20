import React, { useContext } from 'react';
import Styles from './AutoLogin.module.scss';

import { DataContext } from 'contexts/DataContext';
import { handleLogin } from 'service/auth';
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
				handleLogin(e, loginData, setIsLoggedin, history, setErrorMsg);
			}}
			className={Styles.autoLogin}>
			Auto Login as a guest.
		</span>
	);
}
