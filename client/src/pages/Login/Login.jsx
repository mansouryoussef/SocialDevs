import React from 'react';
import './LoginStyles.scss';
import Nav from '../../components/Nav/Nav';
import FormCard from '../../components/FormCard/FormCard';
import Footer from '../../components/Footer/Footer';

export default function Login() {
	return (
		<div className='login-page'>
			<Nav />
			<FormCard
				handleSubmit={() => {
					console.log('It worked!');
				}}
				login>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='email'>Email</label>
					<input id='email' type='email' />
				</div>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='password'>Password</label>
					<input id='password' type='password' />
				</div>
			</FormCard>
			<Footer />
		</div>
	);
}
