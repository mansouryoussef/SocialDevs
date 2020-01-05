import React, { useContext } from 'react';
import { format } from 'date-fns';
import { DataContext } from '../../../contexts/DataContext';
import uuid from 'uuid';
import IconButtonDanger from '../../Buttons/IconButtonDanger/IconButtonDanger';
import trashWhite from '../../../assets/img/icons/trashWhite.svg';

export default function TableList({ arr, itemNamesArr, handleDelete }) {
	const { setUserProfile } = useContext(DataContext);

	return arr.map(item => {
		const to =
			item.to === null ? 'Present' : format(new Date(item.to), 'dd-MM-yyyy');

		const from = format(new Date(item.from), 'dd.MM.yyyy');

		return (
			<tr key={uuid()} className='profile-table__info-row'>
				<td>{item[itemNamesArr[0]]}</td>

				<td>{item[itemNamesArr[1]]}</td>

				<td>
					<span>{from}</span> - <span>{to}</span>
				</td>

				<td>
					<IconButtonDanger
						onClick={() => handleDelete(item._id, setUserProfile)}
						text='Delete'
						filled
						icon={trashWhite}
					/>
				</td>
			</tr>
		);
	});
}
