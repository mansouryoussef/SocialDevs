import React, { useState, useContext } from 'react';
import './AddEducationFormStyles.scss';
import Button from 'components/Shared/Buttons/Button/Button';
import { DataContext } from 'contexts/DataContext';
import { handleAddEdu } from 'service/profile';

export default function AddEducationForm({ setAddingEdu, setError }) {
	const { setUserProfile, userProfile } = useContext(DataContext);
	const [errorMsg, setErrorMsg] = useState('');

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
		<tr className='profile-table__edit-row'>
			<td>
				<input
					placeholder='School here'
					value={school}
					onChange={e => handleChange(e)}
					name='school'
					type='text'
				/>
			</td>
			<td>
				<input
					placeholder='Degree here'
					value={degree}
					onChange={e => handleChange(e)}
					name='degree'
					type='text'
				/>
			</td>

			<table className='profile-table__edit-row__date-inputs'>
				<tr>
					<input
						placeholder='From: DD-MM-YY'
						value={from}
						onChange={e => handleChange(e)}
						name='from'
						type='text'
					/>
				</tr>

				<tr>
					<input
						placeholder='To: DD-MM-YY'
						value={to}
						onChange={e => handleChange(e)}
						name='to'
						type='text'
					/>
				</tr>
			</table>

			<span className='profile-table__edit-row__error'>{errorMsg}</span>

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
