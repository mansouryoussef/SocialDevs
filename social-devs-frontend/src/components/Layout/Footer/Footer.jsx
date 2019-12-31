import React from 'react';
import './FooterStyles.scss';
export default function Footer({ match }) {
	return (
		<div className='footer-container'>
			<div className='footer-container__item'>
				<h3>Designed and developed by: </h3>
				<p>Youssef Mansour</p>
			</div>
			<div className='footer-container__item'>
				<p>© 2019</p>
			</div>
		</div>
	);
}
