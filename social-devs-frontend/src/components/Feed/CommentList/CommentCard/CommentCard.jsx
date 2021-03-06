import React, { useContext } from 'react';
import Styles from './CommentCard.module.scss';

import ButtonDanger from 'components/Shared/Buttons/ButtonDanger/ButtonDanger';
import { handleDeleteComment } from 'service/post';
import defaultUserImg from 'assets/img/icons/user.svg';
import { PostContext } from 'contexts/PostContext';
import { UserContext } from 'contexts/UserContext';
import { LoadingContext } from '../../../../contexts/LoadingContext';

export default function CommentCard({
	commentOwnerId,
	text,
	name,
	date,
	commentId,
	postId
}) {
	const { setPosts } = useContext(PostContext);
	const { setIsLoading } = useContext(LoadingContext);
	const { user } = useContext(UserContext);

	return (
		<div data-cy='comment_card' className={Styles.commentCardContainer}>
			<div className={Styles.imgNameContainer}>
				<img
					className={Styles.img}
					src={defaultUserImg}
					alt='user default img'
				/>

				<h2 data-cy='name' className={Styles.name}>
					{name}
				</h2>
			</div>

			<div className={Styles.bodyContainer}>
				<p data-cy='comment_text' className={Styles.text}>
					{text}
				</p>

				<span className={Styles.dateBtnContainer}>
					<span>Commented on: {date}</span>

					{commentOwnerId === user._id && (
						<ButtonDanger
							onClick={() =>
								handleDeleteComment(postId, commentId, setPosts, setIsLoading)
							}
							text='Delete'
							filled
						/>
					)}
				</span>
			</div>
		</div>
	);
}
