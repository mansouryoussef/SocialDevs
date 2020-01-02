import React, { useState, useContext, useEffect, useMemo } from 'react';
import './PostCardStyles.scss';
import notLiked from '../../../../assets/img/icons/emptyheart.svg';
import like from '../../../..//assets/img/icons/filledheart.svg';
import { DataContext } from '../../../../contexts/DataContext';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '../../../Button/Button';
import defaultUserImg from '../../../../assets/img/icons/user.svg';
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
	// const likedByUser = likes.find(like => like.user === user._id);

	const [liked, setLiked] = useState(
		likes.find(like => (like.user === user._id) !== undefined)
	);
	const [likesCount, setLikesCount] = useState(likes.length);

	// @TODO consider using useMemo
	// const isPostOwner = useMemo(() => user._id === postUserId, [user])

	// const isLiked = async likesArr => {
	// 	const isLikedByUser = await likesArr.find(like => like.user === user._id
	// 	if (likesArr.find(like => like.user === user._id) !== undefined)
	// 		return true;
	// };
	useEffect(() => {
		// @TODO consider using usememo instead of useEffect + useState
		const likedByUser = likes.find(like => like.user === user._id);

		if (likedByUser !== undefined) {
			setLiked(true);
		}
	}, [likes]);

	const handleLike = async () => {
		try {
			const config = {
				// @TODO move this logic to an own service. e.g. auth.js or api.js
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			const res = await Axios.put(`/api/posts/like/${id}`, null, config);
			await likes.push(res.data[0]);

			setLiked(true);
			setLikesCount(likesCount + 1);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnlike = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			await Axios.put(`/api/posts/unlike/${id}`, null, config);
			setLiked(false);
			setLikesCount(likesCount - 1);
		} catch (error) {
			console.log(error);
		}
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
		// @TODO separete view from other logic.e.g. create an own Post Component
		// Example: --> < Post onUnlike={handleUnlike} />
		<div className='postcard-container'>
			<div className='postcard-container__img-name'>
				<img
					src={defaultUserImg}
					className='postcard-container__img-name__img'
					alt={`${name}'s picture`}
				/>

				<h2 className='postcard-container__img-name__name'>
					{name.split(' ')[0]}
					{/* // @TODO you can move this to an own service e.g user.js  */}
				</h2>
			</div>

			<div className='postcard-container__body'>
				<p className='postcard-container__body__text'>{text}</p>

				<span className='postcard-container__body__date'>
					Posted on: {date}
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
