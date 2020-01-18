import React from 'react';
import Styles from './FormCardNote.module.scss';
import { Link } from 'react-router-dom';

export default function FormCardNote({ note, to, linkText }) {
	return (
		<p className={Styles.FormCardNoteContainer}>
			{note}

			<Link className='Link' to={to}>
				{linkText}
			</Link>
		</p>
	);
}
