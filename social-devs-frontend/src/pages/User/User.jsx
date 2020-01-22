import React, { useContext, useState, useEffect } from 'react';
import Styles from './UserPage.module.scss';
import UserHeader from 'components/User/UserHeader/UserHeader';
import UserInfoCard from 'components/User/UserInfoCard/UserInfoCard';
import UserOccupationCard from 'components/User/UserOccupationCard/UserOccupationCard';
import { ProfileContext } from 'contexts/ProfileContext';

export default function User({ match }) {
	const { profiles } = useContext(ProfileContext);
	const [profile, setProfile] = useState([]);

	useEffect(() => {
		if (profiles.length !== 0) {
			setProfile(
				profiles.filter(profile => {
					return profile.user._id === match.params.user_id;
				})[0]
			);
		}
	}, [profiles]);

	const { experience, education } = profile;

	return (
		<>
			{profile.length !== 0 && (
				<div className={Styles.userPage}>
					<div className={Styles.userPageContent}>
						<UserHeader profile={profile} />
						<UserInfoCard profile={profile} />

						{(experience.length !== 0 || education.length !== 0) && (
							<div className={Styles.cardsContainer}>
								<UserOccupationCard dataArray={experience} title='Experience' />
								<UserOccupationCard dataArray={education} title='Education' />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
