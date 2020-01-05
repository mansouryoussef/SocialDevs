import React from 'react';
import './ButtonDangerStyles.scss';
export default function ButtonDanger({ text, filled }) {
	return (
		<button className='button-danger-container' id={filled ? 'filled' : ''}>
			{text}
		</button>
	);
}
