import React from 'react';
import './CommentCardStyles.scss';
import person from '../../assets/img/person.jpg';
import Button from '../Button/Button';

export default function CommentCard({ deletable }) {
	return (
		<div className='commentCard-container'>
			<div className='commentCard-container__img-name'>
				<div className='commentCard-container__img-name__cropper'>
					<img src={person} alt='' />
				</div>

				<h2 className='commentCard-container__img-name__name'>Name</h2>
			</div>

			<div className='commentCard-container__body'>
				<p className='commentCard-container__body__text'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
					iusto officiis fugiat consectetur necessitatibus doloribus ipsa
					repudiandae enim, accusamus eaque consequatur excepturi perspiciatis
					iure illum officia voluptatibus est fugit? Provident!
				</p>

				<span className='commentCard-container__body__date'>
					Commented on: 13.11.2019
				</span>

				<div className='commentCard-container__body__btns-container'>
					{deletable && (
						<div className='commentCard-container__body__btns-container__btns'>
							<Button text='Delete' danger sm />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
