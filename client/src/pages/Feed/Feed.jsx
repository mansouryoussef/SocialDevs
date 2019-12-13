import React from 'react';
import './FeedStyles.scss';
import Nav from '../../components/Nav/Nav';
import Button from '../../components/Button/Button';
import PostCard from '../../components/PostCard/PostCard';

export default function Feed() {
	return (
		<div className='feed-page'>
			<Nav loggedin />
			<h1 className='feed-page__title'>Feed</h1>
			<div className='feed-page__content'>
				<div className='feed-page__content__action-container'>
					<p className='feed-page__content__action-container__title'>
						Create a post
					</p>
					<textarea
						placeholder="What's on your mind?"
						className='feed-page__content__action-container__textArea'></textarea>
					<Button text='Post it!' sm highlight />
				</div>
				<div className='feed-page__content__posts-container'>
					<PostCard />
					<PostCard />
					<PostCard />
				</div>
			</div>
		</div>
	);
}
