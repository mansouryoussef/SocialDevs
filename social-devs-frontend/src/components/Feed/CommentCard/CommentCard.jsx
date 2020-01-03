import React, { useContext } from 'react';
import './CommentCardStyles.scss';
import Axios from 'axios';
import { DataContext } from '../../../contexts/DataContext';
import Button from '../../Button/Button';
import { getAllPosts } from '../../../service/post';
import defaultUserImg from '../../../assets/img/icons/user.svg';
export default function CommentCard({
	commentUserId,
	text,
	name,
	avatar,
	date,
	commentId,
	postId
}) {
	const { user, setPosts } = useContext(DataContext);

	const handleDeletePost = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			await Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);

			getAllPosts(setPosts);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='commentCard-container'>
			<div className='commentCard-container__img-name'>
				<img
					className='commentCard-container__img-name__img'
					src={defaultUserImg}
					alt='user default img'
				/>

				<h2 className='commentCard-container__img-name__name'>{name}</h2>
			</div>

			<div className='commentCard-container__body'>
				<p className='commentCard-container__body__text'>{text}</p>

				<span className='commentCard-container__body__date-btn'>
					<span>Commented on: {date}</span>

					{commentUserId === user._id && (
						<Button onClick={handleDeletePost} text='Delete' danger sm />
					)}
				</span>

				{/* <div className='commentCard-container__body__btns-container'>
				</div> */}
			</div>
		</div>
	);
}
