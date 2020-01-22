import React, { useContext, useMemo } from 'react';
import Styles from './PostCard.module.scss';
import Button from 'components/Shared/Buttons/Button/Button';
import Like from './Like/Like';
import trashWhite from 'assets/img/icons/trashWhite.svg';
import defaultUserImg from 'assets/img/icons/user.svg';
import IconButtonDanger from 'components/Shared/Buttons/IconButtonDanger/IconButtonDanger';
import { useHistory, Link } from 'react-router-dom';
import { getFirstName } from 'service/user';
import { handleDeletePost } from 'service/post';

import { PostContext } from 'contexts/PostContext';
import { UserContext } from 'contexts/UserContext';

export default function PostCard({
	text,
	name,
	postUserId,
	likes,
	date,
	id,
	inPost
}) {
	let history = useHistory();

	const { setPosts } = useContext(PostContext);
	const { user } = useContext(UserContext);

	const isPostOwner = useMemo(() => user._id === postUserId, [user]);

	return (
		<div className={Styles.postcardContainer}>
			<div className={Styles.imgNameContainer}>
				<img
					src={defaultUserImg}
					className={Styles.img}
					alt={`${name}'s picture`}
				/>

				<h2 className={Styles.name}>{getFirstName(name)}</h2>
			</div>

			<div className={Styles.bodyContainer}>
				<p className={Styles.postText}>{text}</p>

				<span className={Styles.date}>Posted on: {date}</span>

				<div className={Styles.btnsContainer}>
					<Like likes={likes} postId={id} user={user} />

					<div className={Styles.regularBtnsContainer}>
						{!inPost && (
							<Link className='Link' to={`/post/${id}`}>
								<Button text='Comments' />
							</Link>
						)}

						{isPostOwner && (
							<IconButtonDanger
								icon={trashWhite}
								onClick={() => handleDeletePost(id, setPosts, history)}
								filled
								text='Delete'
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
