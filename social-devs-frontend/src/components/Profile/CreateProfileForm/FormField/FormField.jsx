import React from 'react';
import Styles from './FormField.module.scss';
import { capitalize } from '../../../../service/helpers';

export default function FormField({
	name,
	value,
	onChange,
	placeholder,
	required,
	textarea,
	type
}) {
	const label = `${capitalize(name)}${required ? '*' : ''}`;

	return textarea ? (
		<div className={Styles.textareaContainer}>
			<label>{label}</label>
			<textarea
				value={value}
				onChange={e => onChange(e)}
				name={name}
				placeholder={placeholder}
			/>
		</div>
	) : (
		<div className={Styles.formFieldContainer}>
			<label>{label}</label>
			<input
				value={value}
				onChange={e => onChange(e)}
				name={name}
				type={type ? type : 'text'}
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
