import React, { useState, useContext, useEffect, useMemo } from 'react';
import './PostCardStyles.scss';
import person from '../../assets/img/person.jpg';
import notLiked from '../../assets/img/icons/emptyheart.svg';
import like from '../../assets/img/icons/filledheart.svg';
import Button from '../Button/Button';
import { DataContext } from '../../contexts/DataContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

export default function PostCard({
	text,
	name,
	avatar,
	postUserId,
	likes,
	date,
	id
}) {
	let history = useHistory();
	const { user, posts, setPosts } = useContext(DataContext);

	const [liked, setLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(likes.length);

	// @TODO consider using useMemo
	// const isPostOwner = useMemo(() => user._id === postUserId, [user])

	useEffect(() => {
		// @TODO consider using usememo instead of useEffect + useState
		const likedByUser = likes.find(like => like.user === user._id);

		if (likedByUser) {
			setLiked(true);
		}
	});

	const handleLike = async () => {
		try {
			const config = {
				// @TODO move this logic to an own service. e.g. auth.js or api.js
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			await Axios.put(`/api/posts/like/${id}`, null, config);
		} catch (error) {
			console.log(error);
		}

		setLiked(true);
		setLikesCount(likesCount + 1);
	};

	const handleUnlike = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			await Axios.put(`/api/posts/unlike/${id}`, null, config);
		} catch (error) {
			console.log(error);
		}

		setLiked(false);
		setLikesCount(likesCount - 1);
		console.log(liked);
	};

	const handleDeletePost = async () => {
		try {
			const config = {
				// @TODO move this logic to an own service. e.g. auth.js or api.js
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			await Axios.delete(`/api/posts/${id}`, config);
			history.push('/feed');

			setPosts(posts.filter(post => post._id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		// @TODO separete view from other logic.e.g.create an own Post Component
		// Example: --> < Post onUnlike={handleUnlike} />
		<div className='postcard-container'>
			<div className='postcard-container__img-name'>
				<div className='postcard-container__img-name__cropper'>
					<img src={person} alt={`${name}'s picture`} />
				</div>

				<h2 className='postcard-container__img-name__name'>
					{name.split(' ')[0]}
					{/* // @TODO you can move this to an own service e.g user.js  */}
				</h2>
			</div>

			<div className='postcard-container__body'>
				<p className='postcard-container__body__text'>{text}</p>

				<span className='postcard-container__body__date'>
					Posted on: {format(new Date(date), 'yyyy-MM-dd')}
					{/* // @TODO consider creating a date service to format dates. */}
				</span>

				<div className='postcard-container__body__btns-container'>
					<div className='postcard-container__body__btns-container__like'>
						{liked ? (
							<img onClick={handleUnlike} src={like} alt='Liked' />
						) : (
							<img src={notLiked} onClick={handleLike} alt='Not liked' />
						)}
						{likesCount}
					</div>

					<div className='postcard-container__body__btns-container__btns'>
						<Button text='Comments' to={`/post/${id}`} sm />
						{/* // @TODO consider using useMemo */}
						{user._id === postUserId && (
							<Button onClick={handleDeletePost} text='Delete' danger sm />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
