import React from 'react';
import Styles from './TableTitle.module.scss';
import Disclaimer from 'components/Shared/Disclaimer/Disclaimer';
import Button from 'components/Shared/Buttons/Button/Button';

export default function TableTitle({
	title,
	editingTable,
	handleToggle,
	errorMsg
}) {
	return (
		<div className={Styles.tableTitleContainer}>
			<h2 className={Styles.title}>{title}</h2>

			<span className={Styles.btnContainer}>
				<Button text={editingTable ? 'Cancel' : 'Add'} onClick={handleToggle} />
			</span>

			{errorMsg !== '' && <Disclaimer err={errorMsg} />}
		</div>
	);
}
