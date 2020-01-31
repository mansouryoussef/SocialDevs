import React from 'react';
import Styles from './IconButtonDanger.module.scss';

export default function IconButtonDanger({ text, filled, icon, onClick }) {
	return (
		<button
			className={Styles.iconButtonDangerContainer}
			id={filled ? Styles.filled : ''}
			onClick={onClick}>
			<img src={icon} alt='button icon' />

			<span>{text}</span>
		</button>
	);
}
