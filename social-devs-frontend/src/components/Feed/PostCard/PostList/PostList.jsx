import React from 'react';
import Styles from './PostList.module.scss';
import { format } from 'date-fns';
import PostCard from 'components/Feed/PostCard/PostCard';

export default function PostList({ posts }) {
	return (
		<div className={Styles.postListContainer}>
			{posts.map(post => {
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
						id={_id}
					/>
				);
			})}
		</div>
	);
}
