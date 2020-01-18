import React from 'react';
import Styles from './FormCardField.module.scss';

export default function FormCardField({
	label,
	name,
	value,
	type,
	handleOnChange
}) {
	return (
		<div className={Styles.formCardFieldContainer}>
			<label htmlFor={name}>{label}</label>

			<input
				type={type}
				value={value}
				onChange={e => handleOnChange(e)}
				name={name}
			/>
		</div>
	);
}
