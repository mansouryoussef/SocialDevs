import React, { useContext } from 'react';
import Styles from './TableList.module.scss';
import { format } from 'date-fns';
import IconButtonDanger from 'components/Shared/Buttons/IconButtonDanger/IconButtonDanger';
import trashWhite from 'assets/img/icons/trashWhite.svg';
import { ProfileContext } from 'contexts/ProfileContext';

export default function TableList({ arr, itemNamesArr, handleDelete }) {
	const { setUserProfile } = useContext(ProfileContext);

	return arr.map(item => {
		const to =
			item.to === null ? 'Present' : format(new Date(item.to), 'MM-dd-yyyy');

		const from = format(new Date(item.from), 'MM-dd-yyyy');

		return (
			<tr data-cy='table_info_row' className={Styles.infoRowContainer}>
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
