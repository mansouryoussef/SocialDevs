import React, { useState, useContext } from 'react';
import './ProfileTableStyles.scss';
import Button from '../../Button/Button';
import AddExperienceForm from './AddExperienceForm/AddExperienceForm';
import { DataContext } from '../../../contexts/DataContext';
import TableList from './TableList';
import { capitalize } from '../../../service/helpers';
import AddEducationForm from './AddEducationForm/AddEducationForm';
import { handleDeleteEdu,handleDeleteExp } from '../../../service/profile';

export default function ProfileTable({ info }) {
	const [addingExp, setAddingExp] = useState(false);
	const [addingEdu, setAddingEdu] = useState(false);

	const { userProfile } = useContext(DataContext);
	const { type, headerCells, itemList } = info;

	return (
		<>
			<div className='profile-table__title-container'>
				<h2 className='profile-table__title-container__title'>
					{type == 'experience' ? 'Experience' : 'Education'}
				</h2>

				<span className='profile-table__title-container__btn'>
					<Button
						sm
						text={addingExp ? 'Cancel' : 'Add'}
						onClick={() =>
							type === 'experience'
								? setAddingExp(!addingExp)
								: setAddingEdu(!addingEdu)
						}
					/>
				</span>
			</div>

			<table className='profile-table'>
				<tr className='profile-table__header-row'>
					{headerCells.map(cell => (
						<td>{capitalize(cell)}</td>
					))}
					<td></td>
				</tr>

				{addingExp && type === 'experience' && (
					<AddExperienceForm setAddingExp={setAddingExp} />
				)}

				{addingEdu && type === 'education' && (
					<AddEducationForm setAddingExp={setAddingExp} />
				)}

				{userProfile[type] && (
					<TableList arr={itemList} itemNamesArr={headerCells.slice(0, 2)} handleDelete={type === 'education' ? handleDeleteEdu : handleDeleteExp}/>
				)}
			</table>
		</>
	);
}
