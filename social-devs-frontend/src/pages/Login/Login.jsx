import React, { useState, useContext } from 'react';
import Styles from './Login.module.scss';

import FormCard from 'components/Shared/FormCard/FormCard';
import FormCardField from 'components/Shared/FormCard/FormCardField/FormCardField';
import { DataContext } from 'contexts/DataContext';
import { useHistory } from 'react-router-dom';
import { handleLogin } from 'service/auth';

export default function Login() {
	let history = useHistory();

	const { setIsLoggedin, getInitialData } = useContext(DataContext);

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});

	const [errorMsg, setErrorMsg] = useState('');

	const { email, password } = loginData;

	const handleOnChange = e => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	return (
		<div className={Styles.loginPage}>
			<FormCard
				handleSubmit={e => {
					handleLogin(e, loginData, setIsLoggedin, history, setErrorMsg);
				}}
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
