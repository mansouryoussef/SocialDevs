import React, { useState } from 'react';
import './HamburgerStyles.scss';
export default function Hamburger({ isOpen, onClick }) {
	return (
		<div id='nav-icon' className={isOpen ? 'open' : ''} onClick={onClick}>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	);
}
