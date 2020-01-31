import React from 'react';
import Styles from './Button.module.scss';

export default function Button({ text, filled, onClick }) {
	return (
		<button
			className={Styles.buttonContainer}
			onClick={onClick}
			id={filled ? Styles.filled : ''}>
			{text}
		</button>
	);
}
