import React from 'react';
import './LogoStyles.scss';
import logo from 'assets/img/logo.svg';
import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<div className='logo-container'>
			<Link to='/' className='Link'>
				<img src={logo} alt='Website logo' />
			</Link>

			<p>Social Devs</p>
		</div>
	);
}
