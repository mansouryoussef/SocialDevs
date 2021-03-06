import React from 'react';
import Styles from './CommentList.module.scss';
import CommentCard from './CommentCard/CommentCard';
import { format } from 'date-fns';
import { firstName } from 'service/helpers';
import UUID from 'uuid';

export default function CommentList({ foundPost, postId }) {
	const commentNote = foundPost.some(post => post.comments.length === 0)
		? 'No comments yet.'
		: 'All comments:';

	return (
		<div className={Styles.commentListContainer}>
			<p data-cy='comment_note' className={Styles.commentNote}>
				{commentNote}
			</p>

			{foundPost.map(post => {
				const { comments } = post;

				if (comments.length === 0) {
					return;
				} else {
					return comments.map(comment => {
						const { user, text, name, date, _id } = comment;

						return (
							<CommentCard
								commentOwnerId={user}
								text={text}
								name={firstName(name)}
								date={format(new Date(date), 'dd.MM.yyyy')}
								commentId={_id}
								postId={postId}
								comments={comments}
								key={UUID()}
							/>
						);
					});
				}
			})}
		</div>
	);
}
