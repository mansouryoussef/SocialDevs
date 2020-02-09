import React, { useState, useContext } from 'react';
import Button from 'components/Shared/Buttons/Button/Button';
import DateFields from './DateFields/DateFields';
import TableInputField from '../TableInputField/TableInputField';
import { handleAddEdu } from 'service/profile';
import { ProfileContext } from 'contexts/ProfileContext';

export default function AddEducationForm({ setAddingEdu, setError }) {
	const { setUserProfile } = useContext(ProfileContext);

	const [eduFields, setEduFields] = useState({
		school: '',
		degree: '',
		from: '',
		to: ''
	});

	const handleChange = e => {
		setEduFields({ ...eduFields, [e.target.name]: e.target.value });
	};

	// destructure profile fields
	const { school, degree, from, to } = eduFields;

	return (
		<tr data-cy='add_edu_form'>
			<TableInputField
				name='school'
				value={school}
				handleChange={e => handleChange(e)}
				placeholder='School here'
			/>

			<TableInputField
				name='degree'
				value={degree}
				handleChange={e => handleChange(e)}
				placeholder='Degree here'
			/>

			<DateFields from={from} to={to} handleChange={handleChange} />

			<td>
				<Button
					text='Save it'
					onClick={() =>
						handleAddEdu(
							{ ...eduFields },
							setUserProfile,
							setAddingEdu,
							setError
						)
					}
					filled
				/>
			</td>
		</tr>
	);
}
