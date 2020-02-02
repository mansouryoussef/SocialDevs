import React, { useState, useContext } from 'react';
import Styles from './Login.module.scss';

import FormCard from 'components/Shared/FormCard/FormCard';
import FormCardField from 'components/Shared/FormCard/FormCardField/FormCardField';

import { useHistory } from 'react-router-dom';
import { handleLogin } from 'service/auth';
import { AuthContext } from '../../contexts/AuthContext';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function Login() {
	let history = useHistory();

	const { setIsLoggedin } = useContext(AuthContext);
	const { setIsLoading } = useContext(LoadingContext);

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
			setErrorMsg(error.response.data.errors[0].msg);
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
