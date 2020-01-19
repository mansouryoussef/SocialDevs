import React, { useState } from 'react';
import Styles from './CreateCommentForm.module.scss';
import { handleCreateComment, getAllPosts } from '../../../service/post';
import Button from 'components/Shared/Buttons/Button/Button';

export default function CreateCommentForm({ postId, setPosts }) {
	const [commentText, setCommentText] = useState('');

	const handleOnChange = e => {
		setCommentText(e.target.value);
	};

	return (
		<div className={Styles.createCommentForm}>
			<p className={Styles.title}>Leave a comment</p>

			<textarea
				placeholder="What's on your mind?"
				value={commentText}
				onChange={handleOnChange}
			/>

			<Button
				onClick={() =>
					handleCreateComment(
						commentText,
						postId,
						getAllPosts,
						setPosts,
						setCommentText
					)
				}
				text='Comment it!'
				filled
			/>
		</div>
	);
}
