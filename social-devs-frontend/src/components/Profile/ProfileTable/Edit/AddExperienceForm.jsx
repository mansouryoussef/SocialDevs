import React, { useState, useContext } from 'react';

import Button from 'components/Shared/Buttons/Button/Button';
import { DataContext } from 'contexts/DataContext';
import { handleAddExp } from 'service/profile';
import TableInputField from '../TableInputField/TableInputField';
import DateFields from './DateFields/DateFields';

export default function AddExperienceForm({ setAddingExp, setError }) {
	const { setUserProfile } = useContext(DataContext);

	const [expFields, setExpFields] = useState({
		company: '',
		title: '',
		from: '',
		to: ''
	});

	const handleChange = e => {
		console.log('Name:', e.target.name);
		console.log('Value:', e.target.value);
		setExpFields({ ...expFields, [e.target.name]: e.target.value });
	};

	// destructure profile fields
	const { company, title, from, to } = expFields;

	return (
		<tr>
			<TableInputField
				name='company'
				value={company}
				handleChange={e => handleChange(e)}
				placeholder='Company here'
			/>

			<TableInputField
				name='title'
				value={title}
				handleChange={e => handleChange(e)}
				placeholder='Title here'
			/>

			<DateFields from={from} to={to} handleChange={handleChange} />

			<td>
				<Button
					text='Save it'
					onClick={() =>
						handleAddExp(
							{ ...expFields },
							setUserProfile,
							setAddingExp,
							setError
						)
					}
					filled
				/>
			</td>
		</tr>
	);
}
