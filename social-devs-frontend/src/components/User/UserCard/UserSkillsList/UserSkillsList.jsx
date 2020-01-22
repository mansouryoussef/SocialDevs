import React from 'react';
import Styles from './UserSkillsList.module.scss';
import UUID from 'uuid';

export default function UserSkillsList({ skills }) {
	return (
		<div className={Styles.skillsContainer}>
			{skills.map(skill => (
				<div key={UUID()} className={Styles.skill}>
					<span>{'</> '}</span>
					{skill}
				</div>
			))}
		</div>
	);
}
