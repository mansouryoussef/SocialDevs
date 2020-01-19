import React, { useContext, useState, useEffect, useMemo } from 'react';
import Styles from './Post.module.scss';

import CreateCommentForm from 'components/Feed/CreateCommentForm/CreateCommentForm';
import CurrentPost from '../../components/Feed/CurrentPost/CurrentPost';
import CommentList from '../../components/Feed/CommentList/CommentList';
import { DataContext } from 'contexts/DataContext';

export default function Post({ match }) {
	const { posts, setPosts } = useContext(DataContext);

	const postId = match.params.post_id;

	return (
		<div className={Styles.postPage}>
			<div className={Styles.content}>
				<CurrentPost posts={posts} postId={postId} />

				<CreateCommentForm postId={postId} setPosts={setPosts} />

				<div className={Styles.divider}></div>

				<CommentList posts={posts} postId={postId} />
			</div>
		</div>
	);
}
