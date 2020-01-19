import React from 'react';
import PostCard from 'components/Feed/PostCard/PostCard';
import { findPostById } from '../../../service/post';
import { format } from 'date-fns';

export default function CurrentPost({ posts, postId }) {
	const foundPost = findPostById(posts, postId);

	return foundPost.map(post => {
		const { text, name, avatar, user, likes, date, _id } = post;

		return (
			<PostCard
				key={_id}
				text={text}
				name={name}
				avatar={avatar}
				postUserId={user}
				likes={likes}
				date={format(new Date(date), 'dd.MM.yyyy')}
				inPost
				id={_id}
			/>
		);
	});
}
