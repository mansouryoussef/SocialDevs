import React, { useState } from 'react';
import './HamburgerMenuStyles.scss';
import Hamburger from '../Hamburger/Hamburger';

export default function HamburgerMenu() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav>
			<Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<ul id='nav-links' className={isOpen ? 'open' : ''}>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>About</a>
				</li>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>Contact</a>
				</li>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>Projects</a>
				</li>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>Projects</a>
				</li>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>Projects</a>
				</li>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>Projects</a>
				</li>
				<li className={isOpen ? 'fade' : ''}>
					<a href='#'>Projects</a>
				</li>
			</ul>
		</nav>
	);
}
