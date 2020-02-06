import React, { useState } from 'react';
import Styles from './Login.module.scss';

import FormCard from 'components/Shared/FormCard/FormCard';
import FormCardField from 'components/Shared/FormCard/FormCardField/FormCardField';

import { handleLogin } from 'service/auth';

export default function Login() {
	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});

	const [errorMsg, setErrorMsg] = useState('');

	const { email, password } = loginData;

	const handleOnChange = e => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await handleLogin(loginData);

			window.location.reload();
		} catch (error) {
			console.log(error);
			error.response.data && setErrorMsg(error.response.data.errors[0].msg);
		}
	};

	return (
		<div className={Styles.loginPage}>
			<FormCard
				handleSubmit={handleSubmit}
				login
				errorMsg={errorMsg}
				setErrorMsg={setErrorMsg}>
				<FormCardField
					label='Email'
					name='email'
					value={email}
					handleOnChange={e => handleOnChange(e)}
					type='email'
				/>

				<FormCardField
					label='Password'
					name='password'
					value={password}
					handleOnChange={e => handleOnChange(e)}
					type='password'
				/>
			</FormCard>
		</div>
	);
}
