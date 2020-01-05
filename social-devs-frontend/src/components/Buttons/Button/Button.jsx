import React from 'react';
import './ButtonStyles.scss';
export default function Button({ text, filled }) {
	return (
		<button className='button-container' id={filled ? 'filled' : ''}>
			{text}
		</button>
	);
}
