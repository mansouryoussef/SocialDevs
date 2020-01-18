import React from 'react';
import Styles from './ButtonWhite.module.scss';

export default function ButtonWhite({ text, filled, onClick }) {
	return (
		<button
			className={Styles.buttonWhiteContainer}
			onClick={onClick}
			id={filled ? Styles.filled : ''}>
			{text}
		</button>
	);
}
