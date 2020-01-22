import React from 'react';
import Styles from './UserOccupationCard.module.scss';
import { format } from 'date-fns';
import UUID from 'uuid';
export default function UserOccupationCard({ dataArray, title }) {
	return (
		<div className={Styles.occupationCard}>
			<h1 className={Styles.title}>{title}</h1>

			{dataArray.map((item, i, array) => {
				const subtitle = title === 'Experience' ? item.title : item.school;
				const info = title === 'Experience' ? item.company : item.degree;

				const from = format(new Date(item.from), 'dd.MM.yyyy');
				const to =
					item.to === null
						? 'Present'
						: format(new Date(item.to), 'dd-MM-yyyy');

				return (
					<div key={UUID()}>
						<p className={Styles.subtitle}>{subtitle}</p>

						<p className={Styles.info}>{info}</p>

						<p className={Styles.dates}>
							{from} - {to ? to : 'Present'}
						</p>

						{array.length - 1 !== i && <div className={Styles.divider}></div>}
					</div>
				);
			})}
		</div>
	);
}
