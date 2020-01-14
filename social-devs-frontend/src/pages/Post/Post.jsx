import React, { useContext, useState, useEffect } from 'react';
import './PostStyles.scss';
import Axios from 'axios';
import { DataContext } from 'contexts/DataContext';
import Button from 'components/Shared/Buttons/Button/Button';
import CommentCard from 'components/Feed/CommentCard/CommentCard';
import PostCard from 'components/Feed/PostCard/PostCard';
import { format } from 'date-fns';
import { firstName } from 'service/helpers';
import { getAllPosts } from 'service/post';
import uuid from 'uuid';

export default function Post({ match }) {
	const { posts, setPosts } = useContext(DataContext);
	const [commentText, setCommentText] = useState('');

	const handleOnChange = e => {
		setCommentText(e.target.value);
	};

	const handleCreateComment = async () => {
		try {
			const body = {
				text: commentText
			};

			const config = {
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			const res = await Axios.put(
				`/api/posts/comment/${match.params.post_id}`,
				body,
				config
			);
			console.log(res);

			getAllPosts(setPosts);

			setCommentText('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='post-page'>
			<div className='post-page__content'>
				{/* @TODO consider creating a separate functional component from this. e.g. <Posts posts={posts}> */}
				{/* @TODO maybe the function "filter" could be a better fit here */}
				{posts.map(post => {
					const { text, name, avatar, user, likes, date, comments, _id } = post;

					if (_id === match.params.post_id) {
						return (
							<PostCard
								key={_id}
								text={text}
								name={name}
								avatar={avatar}
								postUserId={user}
								likes={likes}
								date={date}
								inPost
								id={_id}
							/>
						);
					}
				})}

				<div className='post-page__content__action-container'>
					<p className='post-page__content__action-container__title'>
						Leave a comment
					</p>

					<textarea
						placeholder="What's on your mind?"
						className='post-page__content__action-container__textArea'
						value={commentText}
						onChange={handleOnChange}
					/>

					<Button onClick={handleCreateComment} text='Comment it!' filled />
				</div>

				<div className='divider'></div>

				<div className='post-page__content__comments-container'>
					<p className='post-page__content__comments-container__headerText'>
						All comments:
					</p>

					{/* @TODO consider creating a separate functional component from this. e.g. <Comments comments={comments}> */}
					{/* @TODO maybe the function "filter" could be a better fit here */}
					{posts.map(post => {
						const { comments, _id } = post;

						if (_id === match.params.post_id) {
							{
								/* @TODO consider creating a separate functional component from this. e.g. <Comments comments={comments}> */
							}

							return comments.map(comment => {
								const { user, text, name, avatar, date, _id } = comment;

								return (
									<CommentCard
										commentUserId={user}
										text={text}
										name={firstName(name)}
										avatar={avatar}
										date={format(new Date(date), 'dd.MM.yyyy')}
										commentId={_id}
										postId={match.params.post_id}
										comments={comments}
										key={uuid()}
									/>
								);
							});
						}
					})}
				</div>
			</div>
		</div>
	);
}
