import React from 'react';
import Styles from './Spinner.module.scss';

export default function Spinner() {
	return (
		<div className={Styles.spinnerContainer}>
			<svg className={Styles.spinner} viewBox='0 0 50 50'>
				<circle
					className={Styles.path}
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
