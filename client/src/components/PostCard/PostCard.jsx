import React from 'react';
import './PostCardStyles.scss';
import person from '../../assets/img/person.jpg';
import Button from '../Button/Button';

export default function PostCard() {
	return (
		<div className='postcard-container'>
			<div className='postcard-container__img-name'>
				<div className='postcard-container__img-name__cropper'>
					<img src={person} alt='' />
				</div>
				<h2 className='postcard-container__img-name__name'>Name</h2>
			</div>
			<div className='postcard-container__body'>
				<p className='postcard-container__body__text'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
					iusto officiis fugiat consectetur necessitatibus doloribus ipsa
					repudiandae enim, accusamus eaque consequatur excepturi perspiciatis
					iure illum officia voluptatibus est fugit? Provident!
				</p>
				<span className='postcard-container__body__date'>
					Posted on: 13.11.2019
				</span>
				<div className='postcard-container__body__btns'>
					<Button text='Discussion' sm />
					<Button text='Delete' danger sm />
				</div>
			</div>
		</div>
	);
}
