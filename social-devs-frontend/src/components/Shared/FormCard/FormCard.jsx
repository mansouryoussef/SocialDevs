import React from 'react';
import './FormCardStyles.scss';
import { Link } from 'react-router-dom';

import Button from 'components/Shared/Buttons/Button/Button';
import AutoLogin from './AutoLogin/AutoLogin';

export default function FormCard({
	handleSubmit,
	login,
	children,
	errorMsg,
	setErrorMsg
}) {
	return (
		<form className='formcard-container'>
			<h1 className='formcard-container__title'>
				{login ? 'Log in' : 'Sign up'}
			</h1>

			<div className='formcard-container__input-fields'>{children}</div>

			<span className='formcard-container__error'>{errorMsg}</span>

			<div className='formcard-container__btn-container'>
				<Link className='Link' to='/profile'>
					<Button
						onClick={handleSubmit}
						text={login ? 'Log in' : 'Sign up'}
						filled
					/>
				</Link>

				<AutoLogin setErrorMsg={setErrorMsg} />
			</div>

			{/* @TODO consider moving this to an own component. e.g. Note */}
			<p className='formcard-container__note'>
				{login ? 'Don’t have an account?' : 'Already have an account?'}

				<Link className='Link' to={login ? '/signup' : '/login'}>
					{login ? 'Sign up' : 'Log in'}
				</Link>
			</p>
		</form>
	);
}
