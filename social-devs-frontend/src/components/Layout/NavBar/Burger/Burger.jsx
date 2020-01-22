import React from 'react';
import Styles from './Burger.module.scss';

export default function Burger({ open, setOpen }) {
	return (
		<div onClick={() => setOpen(!open)}>
			<a
				className={open ? Styles.active : ''}
				id={Styles.burgerContainer}
				href='#'>
				<span></span>
			</a>
		</div>
	);
}
