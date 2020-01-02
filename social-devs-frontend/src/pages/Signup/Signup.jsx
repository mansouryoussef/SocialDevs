import React, { useState, useContext } from 'react';
import './SignupStyles.scss';
import FormCard from '../../components/FormCard/FormCard';
import axios from 'axios';
import { DataContext } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';

export default function Signup() {
	let history = useHistory();

	const { setIsLoggedin, getInitialData } = useContext(DataContext);

	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errorMsg, setErrorMsg] = useState('');

	// destructure signupData fields
	const { name, email, password, confirmPassword } = signupData;

	const handleOnChange = e => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};

	const handleOnSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrorMsg("Passwords don't match.");
		} else {
			const newUser = {
				name,
				email,
				password
			};

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};

				const body = JSON.stringify(newUser);

				const res = await axios.post('/api/users', body, config);

				// @TODO move logging in logic to a service.

				// @TODO consider moving this to a service and create a login Fn.
				window.localStorage.setItem('userToken', res.data.token);
				getInitialData();
				setIsLoggedin(true);

				history.push('/feed');
			} catch (error) {
				if (error.response.data !== undefined) {
					setErrorMsg(error.response.data.errors[0].msg);
					console.log(error.response.data.errors[0].msg);
				}
				console.log(error);
			}
		}
	};

	return (
		<div className='signup-page'>
			{/* @TODO 
			Suggestion:
			It feels that this component is mixing two things.
			Maybe it could be better, to create a component from the FormCard & its input elements together with handleOnChange Fn.
			This way we separate the form inputs from the submission logic. 
			*/}
			<FormCard
				handleSubmit={e => {
					handleOnSubmit(e);
				}}
				errorMsg={errorMsg}>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='name'>Name</label>

					<input
						id='name'
						value={name}
						onChange={e => handleOnChange(e)}
						name='name'
						type='text'
					/>
				</div>
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
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='confirm password'>Confirm password</label>

					<input
						id='confirm password'
						type='password'
						value={confirmPassword}
						onChange={e => handleOnChange(e)}
						name='confirmPassword'
					/>
				</div>
			</FormCard>
		</div>
	);
}
