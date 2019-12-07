import React from 'react';
import './SignupStyles.scss';
import Nav from '../../components/Nav/Nav';
import FormCard from '../../components/FormCard/FormCard';
import Footer from '../../components/Footer/Footer';
export default function Signup() {
	return (
		<div className='signup-page'>
			<Nav />
			<FormCard
				handleSubmit={() => {
					console.log('It worked!');
				}}>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='name'>Name</label>
					<input id='name' type='text' />
				</div>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='email'>Email</label>
					<input id='email' type='email' />
				</div>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='password'>Password</label>
					<input id='password' type='password' />
				</div>
				<div className='formcard-container__input-fields__field'>
					<label htmlFor='confirm password'>Confirm password</label>
					<input id='confirm password' type='password' />
				</div>
			</FormCard>
			<Footer />
		</div>
	);
}
