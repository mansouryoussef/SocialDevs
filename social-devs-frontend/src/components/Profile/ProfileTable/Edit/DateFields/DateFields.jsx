import React from 'react';
import Styles from './DateFields.module.scss';
import TableInputField from '../../TableInputField/TableInputField';

export default function DateFields({ from, to, handleChange }) {
	return (
		<table className={Styles.dateFields}>
			<TableInputField
				name='from'
				value={from}
				handleChange={e => handleChange(e)}
				placeholder='From: DD-MM-YY'
				tr
			/>

			<TableInputField
				name='to'
				value={to}
				handleChange={e => handleChange(e)}
				placeholder='To: DD-MM-YY'
				tr
			/>
		</table>
	);
}
