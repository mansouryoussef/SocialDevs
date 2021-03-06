import React, { useContext } from 'react';
import Styles from './Post.module.scss';

import CreateCommentForm from 'components/Feed/CreateCommentForm/CreateCommentForm';
import CurrentPost from 'components/Feed/CurrentPost/CurrentPost';
import CommentList from 'components/Feed/CommentList/CommentList';
import { PostContext } from 'contexts/PostContext';
import { findPostById } from '../../service/post';

export default function Post({ match }) {
	const { posts, setPosts } = useContext(PostContext);

	const postId = match.params.post_id;

	const foundPost = findPostById(posts, postId);

	return (
		<div className={Styles.postPage}>
			<div className={Styles.content}>
				<CurrentPost posts={posts} postId={postId} />

				<CreateCommentForm postId={postId} setPosts={setPosts} />

				<div className={Styles.divider}></div>

				<CommentList foundPost={foundPost} postId={postId} />
			</div>
		</div>
	);
}
