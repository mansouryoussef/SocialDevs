import React, { useContext } from 'react';
import Styles from './Feed.module.scss';
import PostList from 'components/Feed/PostCard/PostList/PostList';
import CreatePostForm from 'components/Feed/CreatePostForm/CreatePostForm';
import { PostContext } from 'contexts/PostContext';

export default function Feed() {
	const { posts, setPosts } = useContext(PostContext);

	return (
		<div className={Styles.feedPage}>
			<h1 className={Styles.title}>Feed</h1>
			<div className={Styles.content}>
				<CreatePostForm posts={posts} setPosts={setPosts} />
				<PostList posts={posts} />
			</div>
		</div>
	);
}
