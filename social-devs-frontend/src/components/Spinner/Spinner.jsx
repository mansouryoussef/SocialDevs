import React from 'react';
import './SpinnerStyles.scss';

export default function Spinner() {
	return (
		<div className='spinner-container'>
			<svg className='spinner-container__spinner' viewBox='0 0 50 50'>
				<circle
					className='path'
					cx='25'
					cy='25'
					r='20'
					fill='none'
					strokeWidth='3'></circle>
			</svg>
			<p>Loading...</p>
		</div>
	);
}
