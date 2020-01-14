import React from 'react';
import './ButtonStyles.scss';
export default function Button({ text, filled, onClick }) {
	return (
		<button
			className='button-container'
			onClick={onClick}
			id={filled ? 'filled' : ''}>
			{text}
		</button>
	);
}
