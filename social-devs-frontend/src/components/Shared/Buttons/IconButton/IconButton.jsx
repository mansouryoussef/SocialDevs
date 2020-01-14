import React from 'react';
import './IconButtonStyles.scss';
export default function IconButton({ text, filled, icon }) {
	return (
		<button className='icon-button-container' id={filled ? 'filled' : ''}>
			<img
				className='icon-button-container__icon'
				src={icon}
				alt='button icon'
			/>
			{text}
		</button>
	);
}
