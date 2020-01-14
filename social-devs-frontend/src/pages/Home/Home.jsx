import React from 'react';
import './HomeStyles.scss';
import { Link } from 'react-router-dom';

import Logo from 'components/Layout/NavBar/Logo/Logo';
import Button from 'components/Shared/Buttons/Button/Button';
import ButtonWhite from 'components/Shared/Buttons/ButtonWhite/ButtonWhite';
import AutoLogin from 'components/Shared/FormCard/AutoLogin/AutoLogin';
import Hero from 'components/Layout/Hero/Hero';

export default function Home() {
	return (
		<main className='home-page'>
			{/* @TODO consider making the clip an own component */}
			<div className='home-page__clip'></div>
			<section className='home-page__container'>
				<nav className='home-page__container__nav'>
					<Logo />
					<Link className='Link' to='/users'>
						<ButtonWhite text='View users' />
					</Link>
				</nav>

				<div className='home-page__container__content'>
					<div className='home-page__container__content__header'>
						<h1>Connecting developers</h1>
						<h2>All over the world</h2>
					</div>

					<div className='home-page__container__content__btns'>
						<Link to='/signup' className='Link'>
							<Button text='Sign up' filled />
						</Link>
						<Link to='/login' className='Link'>
							<Button text='Log in' />
						</Link>
						<AutoLogin />
					</div>
					<Hero />
				</div>
			</section>
		</main>
	);
}
