import React from 'react';
import './HomeStyles.scss';
import { Link } from 'react-router-dom';

import Logo from '../../components/Logo/Logo';
import hero from '../../assets/img/hero.svg';
import Button from '../../components/Buttons/Button/Button';
import ButtonWhite from '../../components/Buttons/ButtonWhite/ButtonWhite';
export default function Home() {
	return (
		<main className='home-page'>
			{/* // @TODO consider making the clip an own component */}
			<div className='home-page__clip'></div>
			<section className='home-page__container'>
				{/* // @TODO consider making the clip an own component */}
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
					</div>

					{/* // @TODO consider making the hero an own component. For real! */}
					<img src={hero} alt='hero' />
				</div>
			</section>
		</main>
	);
}
