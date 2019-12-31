import React, { useContext } from 'react';
import { format } from 'date-fns';
import { handleDeleteExp } from '../../../service/profile';
import { DataContext } from '../../../contexts/DataContext';
import Button from '../../Button/Button';

export default function TableList({ arr, itemNamesArr }) {
	const { setUserProfile } = useContext(DataContext);

	return arr.map(item => {
		const to =
			item.to === null ? 'Present' : format(new Date(item.to), 'dd-MM-yyyy');
		const from = format(new Date(item.from), 'dd-MM-yyyy');

		return (
			<tr className='profile-table__info-row'>
				<td>{item[itemNamesArr[0]]}</td>
				<td>{item[itemNamesArr[1]]}</td>
				<td>
					<span>{from}</span> - <span>{to}</span>
				</td>
				<td>
					<Button
						danger
						onClick={() => handleDeleteExp(item._id, setUserProfile)}
						text='Delete'
						sm
					/>
				</td>
			</tr>
		);
	});
}
