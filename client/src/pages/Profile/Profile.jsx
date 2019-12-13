import React from 'react';
import './ProfileStyles.scss';
import Nav from '../../components/Nav/Nav';
import Button from '../../components/Button/Button';
import deleteprofile from '../../assets/img/icons/deleteprofile.svg';

export default function Profile() {
	return (
		<div className='profile-page'>
			<Nav loggedin />
			<h1 className='profile-page__title'>Profile</h1>
			<div className='profile-page__content'>
				<div className='profile-page__content__table'>
					<div className='profile-page__content__table__title-container'>
						<h2>Experience</h2>
						<span className='profile-page__content__table__title-container__btn'>
							<Button sm text='Add' />
						</span>
					</div>

					<div className='profile-page__content__table__header-row'>
						<h3 className='profile-page__content__table__header-row__item'>
							Company
						</h3>
						<h3 className='profile-page__content__table__header-row__item'>
							Title
						</h3>
						<h3 className='profile-page__content__table__header-row__item'>
							Years
						</h3>
						<span className='profile-page__content__table__header-row__item'></span>
					</div>

					<div className='profile-page__content__table__info-row'>
						<span className='profile-page__content__table__info-row__item'>
							Nice company
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Nice title
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Lots of years
						</span>

						<span className='profile-page__content__table__info-row__btn'>
							{' '}
							<Button danger text='Delete' sm />
						</span>
					</div>

					<div className='profile-page__content__table__info-row'>
						<span className='profile-page__content__table__info-row__item'>
							Nice company
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Nice title
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Lots of years
						</span>

						<span className='profile-page__content__table__info-row__btn'>
							<Button danger text='Delete' sm />
						</span>
					</div>
				</div>

				<div className='profile-page__content__table'>
					<div className='profile-page__content__table__title-container'>
						<h2>Education</h2>
						<span className='profile-page__content__table__title-container__btn'>
							<Button sm text='Add' />
						</span>
					</div>

					<div className='profile-page__content__table__header-row'>
						<h3 className='profile-page__content__table__header-row__item'>
							School
						</h3>
						<h3 className='profile-page__content__table__header-row__item'>
							Degree
						</h3>
						<h3 className='profile-page__content__table__header-row__item'>
							Years
						</h3>
						<span className='profile-page__content__table__header-row__item'></span>
					</div>

					<div className='profile-page__content__table__info-row'>
						<span className='profile-page__content__table__info-row__item'>
							Nice company
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Nice title
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Lots of years
						</span>

						<span className='profile-page__content__table__info-row__btn'>
							{' '}
							<Button danger text='Delete' sm />
						</span>
					</div>

					<div className='profile-page__content__table__info-row'>
						<span className='profile-page__content__table__info-row__item'>
							Nice company
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Nice title
						</span>
						<span className='profile-page__content__table__info-row__item'>
							Lots of years
						</span>

						<span className='profile-page__content__table__info-row__btn'>
							<Button danger text='Delete' sm />
						</span>
					</div>
				</div>

				<Button icon={deleteprofile} danger text='Delete my account' sm />
			</div>
		</div>
	);
}
