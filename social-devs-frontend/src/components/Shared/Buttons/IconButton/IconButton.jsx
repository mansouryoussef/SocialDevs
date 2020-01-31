import React from 'react';
import Styles from './IconButton.module.scss';

export default function IconButton({ text, filled, icon }) {
	return (
		<button
			className={Styles.iconButtonContainer}
			id={filled ? Styles.filled : ''}>
			<img className={Styles.icon} src={icon} alt='button icon' />
			{text}
		</button>
	);
}
