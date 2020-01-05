import React from 'react';
import './ButtonWhiteStyles.scss';
export default function ButtonWhite({ text, filled, onClick }) {
	return (
		<button
			className='button-white-container'
			onClick={onClick}
			id={filled ? 'filled' : ''}>
			{text}
		</button>
	);
}
