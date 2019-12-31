import React, { useContext } from 'react';
import './CommentCardStyles.scss';
import person from '../../assets/img/person.jpg'; // @TODO add absolute path not relative path. e.g. @assets/
import Button from '../Button/Button';
import { DataContext } from '../../contexts/DataContext';
import Axios from 'axios';

export default function CommentCard({
	commentUserId,
	text,
	name,
	avatar,
	date,
	commentId,
	postId
}) {
	const { user, getPosts } = useContext(DataContext);

	const handleDeletePost = async () => {
		try {
			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken')
				}
			};

			await Axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);

			getPosts();
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='commentCard-container'>
			<div className='commentCard-container__img-name'>
				<div className='commentCard-container__img-name__cropper'>
					<img src={person} alt='' />
				</div>

				<h2 className='commentCard-container__img-name__name'>{name}</h2>
			</div>

			<div className='commentCard-container__body'>
				<p className='commentCard-container__body__text'>{text}</p>

				<span className='commentCard-container__body__date'>
					Commented on: {date}
				</span>

				<div className='commentCard-container__body__btns-container'>
					{commentUserId === user._id && (
						<div className='commentCard-container__body__btns-container__btns'>
							<Button onClick={handleDeletePost} text='Delete' danger sm />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
