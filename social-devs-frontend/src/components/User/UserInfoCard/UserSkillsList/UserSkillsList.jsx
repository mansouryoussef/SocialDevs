import React from 'react';
import Styles from './UserSkillsList.module.scss';
import UUID from 'uuid';
export default function UserSkillsList({ skills }) {
	return (
		<div className={Styles.skills}>
			{skills.map(skill => {
				return (
					<span className={Styles.skill} key={UUID()}>
						<span>{'</> '}</span> {skill}
					</span>
				);
			})}
		</div>
	);
}
