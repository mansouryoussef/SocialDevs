import React from 'react';
import Styles from './AutoLogin.module.scss';
import { handleLogin } from 'service/auth';

export default function AutoLogin() {
	const loginData = {
		email: 'demo@guest.fi',
		password: '123456'
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await handleLogin(loginData);

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<span onClick={handleSubmit} className={Styles.autoLogin}>
			Auto Login as a guest.
		</span>
	);
}
