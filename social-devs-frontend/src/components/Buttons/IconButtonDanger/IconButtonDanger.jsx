import React from 'react';
import './IconButtonDangerStyles.scss';
export default function IconButtonDanger({ text, filled, icon }) {
	return (
		<button
			className='icon-button-danger-container'
			id={filled ? 'filled' : ''}>
			<img
				className='icon-button-danger-container__icon'
				src={icon}
				alt='button icon'
			/>
			{text}
		</button>
	);
}
