import React, { useState, useContext } from 'react';
import './ProfileTableStyles.scss';
import Button from '../../Buttons/Button/Button';
import AddExperienceForm from './AddExperienceForm/AddExperienceForm';
import { DataContext } from '../../../contexts/DataContext';
import TableList from './TableList';
import { capitalize } from '../../../service/helpers';
import AddEducationForm from './AddEducationForm/AddEducationForm';
import { handleDeleteEdu, handleDeleteExp } from '../../../service/profile';
import Disclaimer from '../../Disclaimer/Disclaimer';

export default function ProfileTable({ info }) {
	const [addingExp, setAddingExp] = useState(false);
	const [addingEdu, setAddingEdu] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const { userProfile } = useContext(DataContext);
	const { type, headerCells, itemList } = info;

	const handleToggle = (setShow, show) => {
		if (userProfile.title === undefined) {
			setErrorMsg('Please create a profile first.');
		} else {
			setShow(!show);
		}
	};
	return (
		<>
			<div className='profile-table__title-container'>
				<h2 className='profile-table__title-container__title'>
					{type == 'experience' ? 'Experience' : 'Education'}
				</h2>

				<span className='profile-table__title-container__btn'>
					<Button
						text={addingExp || addingEdu ? 'Cancel' : 'Add'}
						onClick={() =>
							type === 'experience'
								? handleToggle(setAddingExp, addingExp)
								: handleToggle(setAddingEdu, addingEdu)
						}
					/>
				</span>

				{errorMsg !== '' && <Disclaimer err={errorMsg} />}
			</div>

			<table className='profile-table'>
				<tr className='profile-table__header-row'>
					{headerCells.map(cell => (
						<td key={cell}>{capitalize(cell)}</td>
					))}
					<td></td>
				</tr>

				{addingExp && type === 'experience' && (
					<AddExperienceForm
						setError={setErrorMsg}
						setAddingExp={setAddingExp}
					/>
				)}

				{addingEdu && type === 'education' && (
					<AddEducationForm
						setError={setErrorMsg}
						setAddingEdu={setAddingEdu}
					/>
				)}

				{userProfile[type] && (
					<TableList
						arr={itemList}
						itemNamesArr={headerCells.slice(0, 2)}
						handleDelete={
							type === 'education' ? handleDeleteEdu : handleDeleteExp
						}
					/>
				)}
			</table>
		</>
	);
}
