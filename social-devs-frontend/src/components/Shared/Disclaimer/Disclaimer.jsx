import React from 'react';
import Styles from './Disclaimer.module.scss';
import warning from 'assets/img/icons/warning.svg';

export default function Disclaimer({ err }) {
	return (
		<div className={Styles.disclaimerContainer}>
			<img src={warning} alt='warning icon' />

			<p>{err}</p>
		</div>
	);
}
