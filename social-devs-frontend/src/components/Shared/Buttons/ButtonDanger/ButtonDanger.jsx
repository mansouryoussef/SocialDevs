import React from 'react';
import './ButtonDangerStyles.scss';
export default function ButtonDanger({ text, filled, onClick }) {
	return (
		<button
			className='button-danger-container'
			onClick={onClick}
			id={filled ? 'filled' : ''}>
			{text}
		</button>
	);
}
