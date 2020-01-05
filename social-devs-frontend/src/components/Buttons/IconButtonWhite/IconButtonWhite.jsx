import React from 'react';
import './IconButtonWhiteStyles.scss';

export default function IconButtonWhite({ text, filled, icon, onClick }) {
	return (
		<button
			className='icon-button-white-container'
			id={filled ? 'filled' : ''}
			onClick={onClick}>
			<img
				className='icon-button-white-container__icon'
				src={icon}
				alt='button icon'
			/>
			{text}
		</button>
	);
}
