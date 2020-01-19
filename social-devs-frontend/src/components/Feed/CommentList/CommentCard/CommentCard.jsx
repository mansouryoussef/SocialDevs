import React, { useContext } from 'react';
import Styles from './CommentCard.module.scss';
import { DataContext } from 'contexts/DataContext';
import ButtonDanger from 'components/Shared/Buttons/ButtonDanger/ButtonDanger';
import { handleDeleteComment } from 'service/post';
import defaultUserImg from 'assets/img/icons/user.svg';

export default function CommentCard({
	commentOwnerId,
	text,
	name,
	date,
	commentId,
	postId
}) {
	const { user, setPosts } = useContext(DataContext);

	return (
		<div className={Styles.commentCardContainer}>
			<div className={Styles.imgNameContainer}>
				<img
					className={Styles.img}
					src={defaultUserImg}
					alt='user default img'
				/>

				<h2 className={Styles.name}>{name}</h2>
			</div>

			<div className={Styles.bodyContainer}>
				<p className={Styles.text}>{text}</p>

				<span className={Styles.dateBtnContainer}>
					<span>Commented on: {date}</span>

					{commentOwnerId === user._id && (
						<ButtonDanger
							onClick={() => handleDeleteComment(postId, commentId, setPosts)}
							text='Delete'
							filled
						/>
					)}
				</span>
			</div>
		</div>
	);
}
