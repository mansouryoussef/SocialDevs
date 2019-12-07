import React from 'react';
import './ButtonStyles.scss';
import { Link } from 'react-router-dom';
export default function Button({
	highlight,
	white,
	text,
	icon,
	to,
	sm,
	onClick
}) {
	return (
		<Link to={to ? to : ''} className='Link'>
			<div
				onClick={onClick}
				className={`btn${highlight ? '--highlight' : ''}${
					white ? '--white' : ''
				}`}>
				{icon && <img src={icon} alt='icon' className='btn__icon' />}
				<p style={{ fontSize: sm ? '1.5rem' : '' }}>{text}</p>
			</div>
		</Link>
	);
}
