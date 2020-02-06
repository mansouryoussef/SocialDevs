import React from 'react';
import Styles from './FormCard.module.scss';
import { Link } from 'react-router-dom';

import Button from 'components/Shared/Buttons/Button/Button';
import AutoLogin from './AutoLogin/AutoLogin';
import FormCardNote from './FormCardNote/FormCardNote';

export default function FormCard({
	handleSubmit,
	login,
	children,
	errorMsg,
	setErrorMsg
}) {
	return (
		<form className={Styles.formcardContainer}>
			<h1 className={Styles.title}>{login ? 'Log in' : 'Sign up'}</h1>

			<div className={Styles.inputFieldsContainer}>{children}</div>

			<span id='auth_form_error' className={Styles.errorMsg}>
				{errorMsg}
			</span>

			<div className={Styles.btnContainer}>
				<Link className='Link' to='/profile'>
					<Button
						onClick={handleSubmit}
						text={login ? 'Log in' : 'Sign up'}
						filled
						data-test-id='form-submit-button'
					/>
				</Link>

				<AutoLogin setErrorMsg={setErrorMsg} />
			</div>

			{login ? (
				<FormCardNote
					note='Don’t have an account?'
					to='/signup'
					linkText='Sign up'
				/>
			) : (
				<FormCardNote
					note='Already have an account?'
					to='/login'
					linkText='Log in'
				/>
			)}
		</form>
	);
}
