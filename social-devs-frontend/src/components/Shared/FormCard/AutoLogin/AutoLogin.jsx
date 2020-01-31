import React, { useContext } from 'react';
import Styles from './AutoLogin.module.scss';
import { handleLogin } from 'service/auth';
import { useHistory } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

export default function AutoLogin({ setErrorMsg }) {
	let history = useHistory();

	const { setIsLoggedin } = useContext(AuthContext);

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
