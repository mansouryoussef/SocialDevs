import React from 'react';
import './DisclaimerStyles.scss';
import warning from 'assets/img/icons/warning.svg';

export default function Disclaimer({ err }) {
	return (
		<div className='disclaimer-container'>
			<img src={warning} alt='warning icon' />
			<p>{err}</p>
		</div>
	);
}
