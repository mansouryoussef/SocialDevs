import React from 'react';
import Styles from './TableInputField.module.scss';

export default function TableInputField({
	name,
	value,
	placeholder,
	handleChange,
	tr
}) {
	return tr ? (
		<tr className={Styles.tableRow}>
			<input
				name={name}
				value={value}
				onChange={e => handleChange(e)}
				placeholder={placeholder}
				type='text'
			/>
		</tr>
	) : (
		<td className={Styles.tableData}>
			<input
				name={name}
				value={value}
				onChange={e => handleChange(e)}
				placeholder={placeholder}
				type='text'
			/>
		</td>
	);
}
