import React from 'react';
import Styles from './IconButtonWhite.module.scss';

export default function IconButtonWhite({ text, filled, icon, onClick }) {
	return (
		<button
			className={Styles.iconButtonWhiteContainer}
			id={filled ? Styles.filled : ''}
			onClick={onClick}>
			<img className={Styles.icon} src={icon} alt='button icon' />
			{text}
		</button>
	);
}
