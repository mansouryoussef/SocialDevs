import React from 'react';
import Styles from './Nav.module.scss';

import Logo from '../Logo/Logo';
import ListItems from '../ListItems/ListItems';

export default function Nav() {
	return (
		<nav className={Styles.navContainer}>
			<Logo />
			<ListItems />
		</nav>
	);
}
