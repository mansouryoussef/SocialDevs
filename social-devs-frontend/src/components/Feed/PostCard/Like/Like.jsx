import React, { useState, useMemo } from 'react';
import Styles from './Like.module.scss';
import notLiked from 'assets/img/icons/emptyheart.svg';
import like from 'assets/img/icons/filledheart.svg';
import { handleLike, handleUnlike } from 'service/post';

export default function Like({ likes, postId, user }) {
	const [likesCount, setLikesCount] = useState(likes.length);
	const likedByUser = useMemo(
		() => likes.find(like => like.user === user._id),
		[likes]
	);
	const [liked, setLiked] = useState(likedByUser);

	return (
		<div className={Styles.likeBtn}>
			{liked ? (
				<img
					onClick={() =>
						handleUnlike(postId, setLiked, setLikesCount, likesCount)
					}
					src={like}
					alt='Liked'
					data-cy='unlike_post_btn'
				/>
			) : (
				<img
					src={notLiked}
					onClick={() =>
						handleLike(postId, likes, setLiked, setLikesCount, likesCount)
					}
					data-cy='like_post_btn'
					alt='Not liked'
				/>
			)}
			{likesCount}
		</div>
	);
}
