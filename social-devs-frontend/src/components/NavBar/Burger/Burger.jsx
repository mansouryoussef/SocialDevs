import React from 'react';
import './BurgerStyles.scss';
export default function Burger({ open, setOpen }) {
	return (
		<div onClick={() => setOpen(!open)}>
			<a className={open ? 'active' : ''} id='burger-container' href='#'>
				<span></span>
			</a>
		</div>
	);
}
