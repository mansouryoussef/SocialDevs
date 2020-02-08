import React from 'react';
import Styles from './Logo.module.scss';
import logo from 'assets/img/logo.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<div className={Styles.logoContainer}>
			<Link to='/' className='Link'>
				<img data-cy='logo' src={logo} alt='Website logo' />
			</Link>

			<p>Social Devs</p>
		</div>
	);
}
