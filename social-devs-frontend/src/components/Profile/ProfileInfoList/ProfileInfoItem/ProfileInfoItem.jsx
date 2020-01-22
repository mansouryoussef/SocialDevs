import React from 'react';
import Styles from './ProfileInfoItem.module.scss';

export default function ProfileInfoItem({ label, info, outlined }) {
	return (
		<div className={Styles.itemContainer}>
			<h3 className={Styles.itemTitle}>{label}</h3>
			<p className={outlined ? Styles.itemInfoOutlined : Styles.itemInfo}>
				{info}
			</p>
		</div>
	);
}
