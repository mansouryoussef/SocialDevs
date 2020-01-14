import React, { useState, useContext } from 'react';
import './AddExperienceFormStyles.scss';
import Button from 'components/Shared/Buttons/Button/Button';
import { DataContext } from 'contexts/DataContext';
import { handleAddExp } from 'service/profile';

export default function AddExperienceForm({ setAddingExp, setError }) {
	const { setUserProfile } = useContext(DataContext);

	const [expFields, setExpFields] = useState({
		company: '',
		title: '',
		from: '',
		to: ''
	});

	const handleChange = e => {
		setExpFields({ ...expFields, [e.target.name]: e.target.value });
	};

	// destructure profile fields
	const { company, title, from, to } = expFields;

	return (
		<tr className='profile-table__edit-row'>
			<td>
				<input
					placeholder='Company here'
					value={company}
					onChange={e => handleChange(e)}
					name='company'
					type='text'
				/>
			</td>
			<td>
				<input
					placeholder='Title here'
					value={title}
					onChange={e => handleChange(e)}
					name='title'
					type='text'
				/>
			</td>

			<table className='profile-table__edit-row__date-inputs'>
				<tbody>
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
				</tbody>
			</table>
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
