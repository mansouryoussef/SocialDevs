import React from 'react';
import './PostStyles.scss';

import Nav from '../../components/Nav/Nav';
import Button from '../../components/Button/Button';
import PostCard from '../../components/PostCard/PostCard';
import CommentCard from '../../components/CommentCard/CommentCard';

export default function Post() {
	return (
		<div className='post-page'>
			<Nav loggedin />
			<div className='post-page__content'>
				<PostCard comments />

				<div className='post-page__content__action-container'>
					<p className='post-page__content__action-container__title'>
						Leave a comment
					</p>

					<textarea
						placeholder="What's on your mind?"
						className='post-page__content__action-container__textArea'
					/>

					<Button text='Comment it!' sm highlight />
				</div>

				<div className='divider'></div>

				<div className='post-page__content__comments-container'>
					<p className='post-page__content__comments-container__headerText'>
						All comments:
					</p>

					<CommentCard deletable />
					<CommentCard />
					<CommentCard />
				</div>
			</div>
		</div>
	);
}
