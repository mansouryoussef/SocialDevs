import React from 'react';
import './NavStyles.scss';

import Logo from '../../Logo/Logo';
import ListItems from '../ListItems/ListItems';

export default function Nav() {
	return (
		<nav className='nav-containerr'>
			<Logo />
			<ListItems />
		</nav>
	);
}
