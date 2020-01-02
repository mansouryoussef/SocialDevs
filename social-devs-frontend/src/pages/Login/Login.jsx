import React, { useState, useContext } from 'react';
import './LoginStyles.scss';
import FormCard from '../../components/FormCard/FormCard';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';

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

	const handleOnSubmit = async e => {
		e.preventDefault();

		// @TODO duplicate name of "loginData", consider renaming this to be less confusing.

		const loginData = {
			email,
			password
		};

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const body = JSON.stringify(loginData);

			const res = await axios.post('/api/auth', body, config);

			window.localStorage.setItem('userToken', res.data.token);

			setIsLoggedin(true);
			getInitialData();
			history.push('/profile');
		} catch (error) {
			console.log(error);
			// setErrorMsg(error.response.data.errors[0].msg);
		}
	};

	return (
		<div className='login-page'>
			<FormCard
				handleSubmit={e => {
					handleOnSubmit(e);
				}}
				login
				errorMsg={errorMsg}>
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
