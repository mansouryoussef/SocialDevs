import React from 'react';
import Styles from './Footer.module.scss';

export default function Footer() {
	return (
		<div className={Styles.footerContainer}>
			<div className={Styles.footerItem}>
				<h3>Designed and developed by: </h3>
				<a className='Link' href='https://youssef.fi'>
					<p>Youssef Mansour</p>
				</a>
			</div>
			<div className={Styles.footerItem}>
				<p>© 2020</p>
			</div>
		</div>
	);
}
