import React, { useState, useContext } from 'react';
import Styles from './Signup.module.scss';
import FormCard from 'components/Shared/FormCard/FormCard';
import { DataContext } from 'contexts/DataContext';
import { useHistory } from 'react-router-dom';
import { handleUserSignup } from '../../service/user';
import FormCardField from 'components/Shared/FormCard/FormCardField/FormCardField';

export default function Signup() {
	let history = useHistory();

	const { setIsLoggedin } = useContext(DataContext);

	const [signupData, setSignupData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const [errorMsg, setErrorMsg] = useState('');

	const { name, email, password, confirmPassword } = signupData;

	const newUser = {
		name,
		email,
		password
	};

	const handleOnChange = e => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		password === confirmPassword
			? handleUserSignup(newUser, setIsLoggedin, history, setErrorMsg)
			: setErrorMsg("Passwords don't match, please try again.");
	};
	return (
		<div className={Styles.signupPage}>
			<FormCard handleSubmit={handleSubmit} errorMsg={errorMsg}>
				<FormCardField
					label='Name'
					name='name'
					value={name}
					handleOnChange={e => handleOnChange(e)}
				/>

				<FormCardField
					label='Email'
					name='email'
					value={email}
					handleOnChange={e => handleOnChange(e)}
				/>

				<FormCardField
					label='Password'
					name='password'
					value={password}
					handleOnChange={e => handleOnChange(e)}
					type='password'
				/>

				<FormCardField
					label='Confirm password'
					name='confirmPassword'
					value={confirmPassword}
					handleOnChange={e => handleOnChange(e)}
					type='password'
				/>
			</FormCard>
		</div>
	);
}
