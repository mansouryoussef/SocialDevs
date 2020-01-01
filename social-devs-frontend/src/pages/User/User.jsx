import React, { useContext, useState, useEffect } from 'react';
import './UserStyles.scss';
import person from '../../assets/img/person.jpg';
import { DataContext } from '../../contexts/DataContext';
import { format } from 'date-fns';

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

	const {
		twitter,
		linkedin,
		website,
		skills,
		location,
		bio,
		title,
		githubusername,
		experience,
		education
	} = profile;

	const links = {
		twitter,
		website,
		linkedin
	};
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
								{!!links &&
									Object.entries(links).map(([icon, url]) => (
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
										// const formatDate = date => date.split('T')[0];
										const from = format(new Date(item.from), 'dd.MM.yyyy');
										const to = format(new Date(item.to), 'dd.MM.yyyy');

										return (
											<>
												<p className='user-page__content__exp-edu-container__card__profession'>
													{item.title}
												</p>
												<p className='user-page__content__exp-edu-container__card__company'>
													{item.company}
												</p>
												<p className='user-page__content__exp-edu-container__card__time'>
													{from} - {to ? to : 'Present'}
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
										const from = format(new Date(item.from), 'dd.MM.yyyy');
										const to = format(new Date(item.to), 'dd.MM.yyyy');
										return (
											<>
												<p className='user-page__content__exp-edu-container__card__school'>
													{item.school}
												</p>
												<p className='user-page__content__exp-edu-container__card__time'>
													{from} - {to}
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
