import React, { useState, useContext } from 'react';
import './LoginStyles.scss';
import FormCard from 'components/Shared/FormCard/FormCard';
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

	// destructure loginData fields
	const { email, password } = loginData;

	// @TODO add loginData as a param. To make the function pure.
	const handleOnChange = e => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	return (
		<div className='login-page'>
			<FormCard
				handleSubmit={e => {
					handleLogin(
						e,
						loginData,
						getInitialData,
						setIsLoggedin,
						history,
						setErrorMsg
					);
				}}
				login
				errorMsg={errorMsg}
				setErrorMsg={setErrorMsg}>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='email'>Email</label>

					<input
						id='email'
						type='email'
						value={email}
						onChange={e => handleOnChange(e)}
						name='email'
					/>
				</div>

				<div className='formcard-container__input-fields__field'>
					<label htmlFor='password'>Password</label>

					<input
						id='password'
						type='password'
						value={password}
						onChange={e => handleOnChange(e)}
						name='password'
					/>
				</div>
			</FormCard>
		</div>
	);
}
