import React from 'react';
import './IconButtonDangerStyles.scss';
export default function IconButtonDanger({
	text,
	filled,
	icon,
	onClick
}) {
	return (
		<button
			className='icon-button-danger-container'
			id={filled ? 'filled' : ''}
			onClick={onClick}>
			<img
				className='icon-button-danger-container__icon'
				src={icon}
				alt='button icon'
			/>
			<span>{text}</span>
		</button>
	);
}
