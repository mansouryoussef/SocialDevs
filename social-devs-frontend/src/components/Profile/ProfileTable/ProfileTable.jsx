import React, { useState, useContext, Fragment } from 'react';
import Styles from './ProfileTable.module.scss';
import AddExperienceForm from './Edit/AddExperienceForm';
import TableList from './TableList/TableList';
import AddEducationForm from './Edit/AddEducationForm';
import TableHeaderRow from './TableHeaderRow/TableHeaderRow';
import TableTitle from './TableTitle/TableTitle';
import { handleDeleteEdu, handleDeleteExp } from 'service/profile';
import { ProfileContext } from 'contexts/ProfileContext';

export default function ProfileTable({ info }) {
	const [addingExp, setAddingExp] = useState(false);
	const [addingEdu, setAddingEdu] = useState(false);

	const [errorMsg, setErrorMsg] = useState('');

	const { userProfile } = useContext(ProfileContext);

	const { type, headerCells, itemList } = info;

	const handleToggleError = (setShow, show) => {
		if (userProfile.title === undefined) {
			setErrorMsg('Please create a profile first.');
		} else {
			setShow(!show);
		}
	};

	return (
		<Fragment>
			{type === 'experience' ? (
				<TableTitle
					title='Experience'
					editingTable={addingExp}
					handleToggle={() => handleToggleError(setAddingExp, addingExp)}
					errorMsg={errorMsg}
				/>
			) : (
				<TableTitle
					title='Education'
					editingTable={addingEdu}
					handleToggle={() => handleToggleError(setAddingEdu, addingEdu)}
					errorMsg={errorMsg}
				/>
			)}

			<table className={Styles.profileTable}>
				<tbody>
					<TableHeaderRow cells={headerCells} />

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
				</tbody>
			</table>
		</Fragment>
	);
}
