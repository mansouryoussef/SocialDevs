import React from 'react';
import Styles from './Button.module.scss';

export default function Button({ text, filled, onClick, cypress }) {
	return (
		<button
			className={Styles.buttonContainer}
			onClick={onClick}
			id={filled ? Styles.filled : ''}
			data-cy={cypress}>
			{text}
		</button>
	);
}
