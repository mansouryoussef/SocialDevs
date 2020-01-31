import React from 'react';
import Styles from './UserHeaderLinks.module.scss';

export default function UserHeaderLinks({ links }) {
	const linksArr = Object.entries(links);

	return (
		<div className={Styles.userHeaderSocialLinks}>
			{linksArr.map(([icon, url]) => {
				return (
					url && (
						<a
							key={url}
							href={url}
							className={Styles.userHeaderLink}
							target='_blank'
							rel='noopener noreferrer'>
							<img
								src={require(`../../../../assets/img/icons/${icon}.png`)}
								alt='Github'
								className={Styles.userHeaderLink}
							/>
						</a>
					)
				);
			})}
		</div>
	);
}
