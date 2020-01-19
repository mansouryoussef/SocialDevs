import React, { useState } from 'react';
import Styles from './CreatePostForm.module.scss';
import Button from 'components/Shared/Buttons/Button/Button';
import { handleCreatePost } from '../../../service/post';

export default function CreatePostForm({ posts, setPosts }) {
	const [postText, setPostText] = useState('');

	const handleOnChange = e => {
		setPostText(e.target.value);
	};

	return (
		<div className={Styles.createPostFormContainer}>
			<p className={Styles.title}>Create a post</p>

			<textarea
				onChange={e => handleOnChange(e)}
				value={postText}
				placeholder="What's on your mind?"
			/>

			<Button
				onClick={() => handleCreatePost(postText, posts, setPosts, setPostText)}
				text='Post it!'
				filled
			/>
		</div>
	);
}
