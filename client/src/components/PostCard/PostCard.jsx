import React, { useState } from 'react';
import './PostCardStyles.scss';
import person from '../../assets/img/person.jpg';
import notLiked from '../../assets/img/icons/emptyheart.svg';
import like from '../../assets/img/icons/filledheart.svg';
import Button from '../Button/Button';

export default function PostCard({ deletable, comments }) {
	const [liked, setLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(1);

	const handleLike = () => {
		setLiked(!liked);
		setLikesCount(likesCount + 1);
	};

	const handleUnlike = () => {
		setLiked(!liked);
		setLikesCount(likesCount - 1);
	};

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

				<div className='postcard-container__body__btns-container'>
					{!comments && (
						<div className='postcard-container__body__btns-container__like'>
							{liked ? (
								<img onClick={handleUnlike} src={like} alt='Liked' />
							) : (
								<img src={notLiked} onClick={handleLike} alt='Not liked' />
							)}
							{likesCount}
						</div>
					)}

					<div className='postcard-container__body__btns-container__btns'>
						{!comments && <Button text='Comments' to='/post' sm />}
						{deletable && <Button text='Delete' danger sm />}
					</div>
				</div>
			</div>
		</div>
	);
}
