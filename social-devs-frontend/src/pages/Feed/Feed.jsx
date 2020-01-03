import React, { useContext, useState } from 'react';
import './FeedStyles.scss';
import Button from '../../components/Button/Button';
import { DataContext } from '../../contexts/DataContext';
import Axios from 'axios';
import { format } from 'date-fns';
import PostCard from '../../components/Feed/CommentCard/PostCard/PostCard';

export default function Feed() {
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
			const res = await Axios.post('/api/posts', body, config);
			posts.unshift(res.data);
			setPostText('');
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
				<div className='feed-page__content__posts-container'>
					{posts.map(post => {
						const {
							text,
							name,
							avatar,
							user,
							likes,
							date,
							comments,
							_id
						} = post;

						return (
							<PostCard
								key={_id}
								text={text}
								name={name}
								avatar={avatar}
								postUserId={user}
								likes={likes}
								date={format(new Date(date), 'dd.MM.yyyy')}
								id={_id}
							/>
						);
					})}
				</div>
				;
			</div>
		</div>
	);
}
