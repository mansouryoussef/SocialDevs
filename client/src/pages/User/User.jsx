import React from 'react';
import './UserStyles.scss';
import Nav from '../../components/Nav/Nav';
import person from '../../assets/img/person.jpg';
import git from '../../assets/img/icons/git.png';
import youtube from '../../assets/img/icons/youtube.png';
import facebook from '../../assets/img/icons/facebook.png';
import twitter from '../../assets/img/icons/twitter.jpg';

export default function User() {
	return (
		<div className='user-page'>
			<Nav />
			<div className='user-page__content'>
				<div className='user-page__content__header'>
					<div className='user-page__content__header__img-cropper'>
						<img src={person} alt="User's img" />
					</div>

					<h2 className='user-page__content__header__name'>John Doe</h2>

					<p className='user-page__content__header__title'>Web developer</p>

					<p className='user-page__content__header__location'>
						Baixa, Mozambique
					</p>

					<div className='user-page__content__header__socialLinks'>
						<img
							src={git}
							alt='Github'
							className='user-page__content__header__socialLinks__link'
						/>
						<img
							src={youtube}
							alt='Github'
							className='user-page__content__header__socialLinks__link'
						/>
						<img
							src={facebook}
							alt='Github'
							className='user-page__content__header__socialLinks__link'
						/>
						<img
							src={twitter}
							alt='Github'
							className='user-page__content__header__socialLinks__link'
						/>
					</div>
				</div>

				<div className='user-page__content__bio-skill'>
					<h2 className='user-page__content__bio-skill__bio-title'>Bio</h2>

					<p className='user-page__content__bio-skill__bio-text'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
						excepturi rem dicta. Aspernatur eaque modi harum molestias unde
						voluptatibus nam illum, et sed. Cupiditate assumenda eius quidem
						itaque nulla aliquam.
					</p>

					<div className='divider'></div>

					<h2 className='user-page__content__bio-skill__skills-title'>
						Skills
					</h2>

					<div className='user-page__content__bio-skill__skills'>
						<span className='user-page__content__bio-skill__skills__skill'>
							<span>{'</> '}</span> React
						</span>
						<span className='user-page__content__bio-skill__skills__skill'>
							<span>{'</> '}</span> Node
						</span>
						<span className='user-page__content__bio-skill__skills__skill'>
							<span>{'</> '}</span> MongoDB
						</span>
					</div>
				</div>

				<div className='user-page__content__exp-edu-container'>
					<div className='user-page__content__exp-edu-container__card'>
						<h1 className='user-page__content__exp-edu-container__card__title'>
							Experience
						</h1>
						<p className='user-page__content__exp-edu-container__card__location'>
							Baixa, Mozambique
						</p>
						<p className='user-page__content__exp-edu-container__card__time'>
							13-11-2018 - present
						</p>
						<p className='user-page__content__exp-edu-container__card__profession'>
							Web developer
						</p>
						<p className='user-page__content__exp-edu-container__card__text'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Necessitatibus eius minima, aperiam minus iusto id accusamus odit
							debitis facilis similique, ea consectetur reiciendis, molestias
							nisi omnis. Facilis inventore libero asperiores.
						</p>

						<div className='divider'></div>

						<p className='user-page__content__exp-edu-container__card__location'>
							Baixa, Mozambique
						</p>
						<p className='user-page__content__exp-edu-container__card__time'>
							13-11-2018 - present
						</p>
						<p className='user-page__content__exp-edu-container__card__profession'>
							Web developer
						</p>
						<p className='user-page__content__exp-edu-container__card__text'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Necessitatibus eius minima, aperiam minus iusto id accusamus odit
							debitis facilis similique, ea consectetur reiciendis, molestias
							nisi omnis. Facilis inventore libero asperiores.
						</p>
					</div>

					<div className='user-page__content__exp-edu-container__card'>
						<h1 className='user-page__content__exp-edu-container__card__title'>
							Education
						</h1>
						<p className='user-page__content__exp-edu-container__card__location'>
							Baixa, Mozambique
						</p>
						<p className='user-page__content__exp-edu-container__card__time'>
							2015 - 2019
						</p>
						<p className='user-page__content__exp-edu-container__card__profession'>
							Information technology
						</p>
						<p className='user-page__content__exp-edu-container__card__text'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Necessitatibus eius minima, aperiam minus iusto id accusamus odit
							debitis facilis similique, ea consectetur reiciendis, molestias
							nisi omnis. Facilis inventore libero asperiores.
						</p>

						<div className='divider'></div>

						<p className='user-page__content__exp-edu-container__card__location'>
							Baixa, Mozambique
						</p>
						<p className='user-page__content__exp-edu-container__card__time'>
							2015 - 2019
						</p>
						<p className='user-page__content__exp-edu-container__card__profession'>
							Information technology
						</p>
						<p className='user-page__content__exp-edu-container__card__text'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Necessitatibus eius minima, aperiam minus iusto id accusamus odit
							debitis facilis similique, ea consectetur reiciendis, molestias
							nisi omnis. Facilis inventore libero asperiores.
						</p>
					</div>
				</div>
			</div>
			x
		</div>
	);
}
