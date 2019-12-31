import React, { useContext, useState, useEffect } from 'react';
import './FeedStyles.scss';
import Button from '../../components/Button/Button';
import PostCard from '../../components/PostCard/PostCard';
import { DataContext } from '../../contexts/DataContext';
import Axios from 'axios';

export default function Feed({ match }) {
	const { posts, getPosts } = useContext(DataContext);
	const [postText, setPostText] = useState('');

	const handleOnChange = e => {
		setPostText(e.target.value);
	};

	const handleCreatePost = async () => {
		try {
			const body = {
				text: postText
			};

			const config = {
				// @TODO consider creating a service.
				headers: {
					'x-auth-token': window.localStorage.getItem('userToken'),
					'Content-Type': 'application/json'
				}
			};

			// @TODO post request usually should return the new created post
			// consider updating the posts to include the return new post instead of calling backend.
			await Axios.post('/api/posts', body, config);

			getPosts();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='feed-page'>
			<h1 className='feed-page__title'>Feed</h1>
			<div className='feed-page__content'>
				<div className='feed-page__content__action-container'>
					<p className='feed-page__content__action-container__title'>
						Create a post
					</p>
					<textarea
						onChange={e => handleOnChange(e)}
						value={postText}
						placeholder="What's on your mind?"
						className='feed-page__content__action-container__textArea'
					/>
					<Button onClick={handleCreatePost} text='Post it!' sm highlight />
				</div>
				{/* @TODO consider moving this to an own component */}
				{posts.map(post => {
					const { text, name, avatar, user, likes, date, comments, _id } = post;
					return (
						<div key={_id} className='feed-page__content__posts-container'>
							<PostCard
								text={text}
								name={name}
								avatar={avatar}
								postUserId={user}
								likes={likes}
								date={date}
								comments={comments}
								id={_id}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}