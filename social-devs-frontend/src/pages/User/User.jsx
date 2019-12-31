import React, { useContext, useState, useEffect } from 'react';
import './UserStyles.scss';
import person from '../../assets/img/person.jpg';
import git from '../../assets/img/icons/git.png';
import youtube from '../../assets/img/icons/youtube.png';
import facebook from '../../assets/img/icons/facebook.png';
import twitter from '../../assets/img/icons/twitter.jpg';
import { DataContext } from '../../contexts/DataContext';

export default function User({ match }) {
	const { profiles } = useContext(DataContext);
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

	// console.log('profiles', profiles);
	// console.log('Params:', match.params.user_id);
	// console.log('user Profile:', userProfile);

	const {
		social,
		skills,
		website,
		location,
		bio,
		title,
		githubusername,
		experience,
		education
	} = profile;

	console.log('Profile:', profile);

	// @TODO the template here is abit too long, consider refactoring it into multiple smaller componenets. for example a generic component to display skills or bio.
	return (
		<>
			{profile.length !== 0 && (
				<div className='user-page'>
					<div className='user-page__content'>
						<div className='user-page__content__header'>
							<div className='user-page__content__header__img-cropper'>
								<img src={person} alt="User's img" />
							</div>

							<h2 className='user-page__content__header__name'>
								{profile.user.name}
							</h2>

							<p className='user-page__content__header__title'>{title}</p>

							<p className='user-page__content__header__location'>{location}</p>

							<div className='user-page__content__header__socialLinks'>
								{!!social &&
									Object.entries(social).map(([icon, url]) => (
										<a key={url} href={url} target='_blank'>
											<img
												src={require(`../../assets/img/icons/${icon}.png`)}
												alt='Github'
												className='user-page__content__header__socialLinks__link'
											/>
										</a>
									))}
							</div>
						</div>

						<div className='user-page__content__bio-skill'>
							<h2 className='user-page__content__bio-skill__bio-title'>Bio</h2>

							<p className='user-page__content__bio-skill__bio-text'>{bio}</p>

							<div className='divider'></div>

							<h2 className='user-page__content__bio-skill__skills-title'>
								Skills
							</h2>

							<div className='user-page__content__bio-skill__skills'>
								{skills.map(skill => {
									return (
										<span className='user-page__content__bio-skill__skills__skill'>
											<span>{'</> '}</span> {skill}
										</span>
									);
								})}
							</div>
						</div>

						{(experience.length !== 0 || education.length !== 0) && (
							<div className='user-page__content__exp-edu-container'>
								<div className='user-page__content__exp-edu-container__card'>
									<h1 className='user-page__content__exp-edu-container__card__title'>
										Experience
									</h1>
									{experience.map((item, i, array) => {
										// @TODO refactor this.
										const formatDate = date => date.split('T')[0];

										return (
											<>
												<p className='user-page__content__exp-edu-container__card__profession'>
													{item.title}
												</p>
												<p className='user-page__content__exp-edu-container__card__company'>
													{item.company}
												</p>
												<p className='user-page__content__exp-edu-container__card__time'>
													{formatDate(item.from)} -{' '}
													{item.to ? formatDate(item.to) : 'Present'}
												</p>
												{/* <p className='user-page__content__exp-edu-container__card__location'>
													{item.location}
												</p>
												<p className='user-page__content__exp-edu-container__card__text'>
													{item.description}
												</p> */}
												{array.length - 1 !== i && (
													<div className='divider'></div>
												)}
											</>
										);
									})}
								</div>

								<div className='user-page__content__exp-edu-container__card'>
									<h1 className='user-page__content__exp-edu-container__card__title'>
										Education
									</h1>
									{education.map((item, i, array) => {
										return (
											<>
												<p className='user-page__content__exp-edu-container__card__school'>
													{item.school}
												</p>
												<p className='user-page__content__exp-edu-container__card__time'>
													{item.from.split('T')[0]} - {item.to.split('T')[0]}
												</p>
												<p className='user-page__content__exp-edu-container__card__degree'>
													{item.degree}
												</p>
												<p className='user-page__content__exp-edu-container__card__text'>
													{item.description}
												</p>
												{array.length - 1 !== i && (
													<div className='divider'></div>
												)}
											</>
										);
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
