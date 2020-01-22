import React from 'react';
import Styles from './TableHeaderRow.module.scss';
import { capitalize } from 'service/helpers';

export default function TableHeaderRow({ cells }) {
	return (
		<tr className={Styles.tableHeaderRow}>
			{cells.map(cell => (
				<td key={cell}>{capitalize(cell)}</td>
			))}
			<td></td>
		</tr>
	);
}
