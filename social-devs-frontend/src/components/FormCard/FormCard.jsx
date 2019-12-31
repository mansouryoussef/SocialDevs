import React from 'react';
import './FormCardStyles.scss';
import Button from '../Button/Button';

export default function FormCard({ handleSubmit, login, children, errorMsg }) {
	return (
		<form className='formcard-container'>
			<h1 className='formcard-container__title'>
				{login ? 'Log in' : 'Sign up'}
			</h1>

			<div className='formcard-container__input-fields'>{children}</div>

			<span className='formcard-container__error'>{errorMsg}</span>

			<div className='formcard-container__btn-container'>
				<Button
					onClick={handleSubmit}
					sm
					text={login ? 'Log in' : 'Sign up'}
					to='/profile'
					highlight
				/>
			</div>

			{/* @TODO consider moving this to an own component. e.g. Note */}
			<p className='formcard-container__note'>
				{login ? 'Don’t have an account?' : 'Already have an account?'}
				{/* @TODO use anchor only for outside urls otherwise always use <Link> */}

				<a href={login ? '/signup' : '/login'}>
					{login ? 'Sign up' : 'Log in'}
				</a>
			</p>
		</form>
	);
}
