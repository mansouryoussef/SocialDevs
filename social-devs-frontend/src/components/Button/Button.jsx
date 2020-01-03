import React from 'react';
import './ButtonStyles.scss';
import { Link } from 'react-router-dom';

// @TODO too much logic in one button. I recommend creating a base button and then separately create other buttons such as HighlithedButton & DangerButton
export default function Button({
	highlight,
	white, // @TODO not clear what is this?
	danger, // @TODO rename -->
	text,
	icon,
	to, // @TODO rename to linkToUrl
	sm, // @TODO rename this, not clear.
	disabled,
	onClick
}) {
	return (
		// @TODO Move Link fron button or rename button to be called Link
		<Link to={to} className='Link'>
			<button
				onClick={onClick}
				className={`btn${highlight ? '--highlight' : ''}${
					danger ? '--danger' : ''
				}${white ? '--white' : ''}`}
				disabled={disabled}>
				{/* @TODO move this class name logic to a function , e.g. getButtonClassNames */}
				{icon && <img src={icon} alt='icon' className='btn__icon' />}
				{/* @TODO Move styles (fontsize) to css and toggle class through jsx */}
				<p style={{ fontSize: sm ? '1.5rem' : '' }}>{text}</p>
			</button>
			{/* @TODO Use <button> element */}
		</Link>
	);
}
