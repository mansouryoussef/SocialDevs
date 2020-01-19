import React from 'react';
import Styles from './Home.module.scss';
import { Link } from 'react-router-dom';

import Logo from 'components/Layout/NavBar/Logo/Logo';
import Button from 'components/Shared/Buttons/Button/Button';
import ButtonWhite from 'components/Shared/Buttons/ButtonWhite/ButtonWhite';
import AutoLogin from 'components/Shared/FormCard/AutoLogin/AutoLogin';
import Hero from 'components/Layout/Hero/Hero';
import ClipBackgound from '../../components/Layout/ClipBackgound/ClipBackgound';

export default function Home() {
	return (
		<main className={Styles.homePage}>
			<ClipBackgound />

			<section className={Styles.section}>
				<nav className={Styles.starterNav}>
					<Logo />

					<Link className='Link' to='/users'>
						<ButtonWhite text='View users' />
					</Link>
				</nav>

				<div className={Styles.content}>
					<div className={Styles.header}>
						<h1>Connecting developers</h1>
						<h2>All over the world</h2>
					</div>

					<div className={Styles.btnsContainer}>
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
