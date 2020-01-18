import React from 'react';
import Styles from './ButtonDanger.module.scss';

export default function ButtonDanger({ text, filled, onClick }) {
	return (
		<button
			className={Styles.buttonDangerContainer}
			onClick={onClick}
			id={filled ? Styles.filled : ''}>
			{text}
		</button>
	);
}
