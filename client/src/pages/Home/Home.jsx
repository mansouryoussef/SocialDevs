import React from 'react';
import './HomeStyles.scss';
import Logo from '../../components/Logo/Logo';
import hero from '../../assets/img/hero.svg';
import Button from '../../components/Button/Button';

export default function Home() {
	return (
		<main className='home-page'>
			<div className='home-page__clip'></div>
			<section className='home-page__container'>
				<nav className='home-page__container__nav'>
					<Logo />
					<Button to='/users' text='View users' white />
				</nav>
				<div className='home-page__container__content'>
					<div className='home-page__container__content__header'>
						<h1>Connecting developers</h1>
						<h2>All over the world</h2>
					</div>
					<div className='home-page__container__content__btns'>
						<Button to='/signup' text='Sign up' highlight />
						<Button to='/login' text='Log in' />
					</div>
					<img src={hero} alt='hero' />
				</div>
			</section>
		</main>
	);
}
