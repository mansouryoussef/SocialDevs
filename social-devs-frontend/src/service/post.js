import {
	getAllPostsReq,
	createAuthHeader,
	deleteCommentReq,
	deletePostReq,
	likePost,
	unlikePost,
	createPost,
	createComment
} from './api';

// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

//  Fetches: user profile data
export const getAllPosts = async setPosts => {
	try {
		const headers = createAuthHeader(token);

		const res = await getAllPostsReq({ ...headers });

		setPosts(res.data);
	} catch (error) {
		console.log(error);
	}
};

//  Handler: create post
export const handleCreatePost = async (
	postText,
	posts,
	setPosts,
	setPostText
) => {
	try {
		const headers = createAuthHeader(token);

		const body = {
			text: postText
		};

		const res = await createPost(body, { ...headers });

		setPosts([res.data, ...posts]);

		setPostText('');
	} catch (error) {
		console.log(error);
	}
};

//  Handler: deletes post
export const handleDeletePost = async (postId, setPosts, history) => {
	try {
		const headers = createAuthHeader(token);

		const res = await deletePostReq(postId, { ...headers });
		console.log(res.data);
		setPosts(res.data);

		history.push('/feed');
	} catch (error) {
		console.error(error);
	}
};

//  Handler: creates comment
export const handleCreateComment = async (
	commentText,
	postId,
	getAllPosts,
	setPosts,
	setCommentText
) => {
	try {
		const headers = createAuthHeader(token);

		const body = {
			text: commentText
		};

		const res = await createComment(postId, body, { ...headers });

		getAllPosts(setPosts);

		setCommentText('');
	} catch (error) {
		console.log(error);
	}
};

//  Handler: deletes post comment
export const handleDeleteComment = async (postId, commentId, setPosts) => {
	try {
		const headers = createAuthHeader(token);

		await deleteCommentReq({ ...headers }, postId, commentId);

		getAllPosts(setPosts);
	} catch (error) {
		console.error(error);
	}
};

//  Handler: like post
export const handleLike = async (
	postId,
	likes,
	setLiked,
	setLikesCount,
	likesCount
) => {
	try {
		const headers = createAuthHeader(token);

		const res = await likePost(postId, { ...headers });
		likes.push(res.data[0]);

		setLiked(true);
		setLikesCount(likesCount + 1);
	} catch (error) {
		console.log(error);
	}
};

//  Handler: unlike post
export const handleUnlike = async (
	postId,
	setLiked,
	setLikesCount,
	likesCount
) => {
	try {
		const headers = createAuthHeader(token);

		await unlikePost(postId, { ...headers });

		setLiked(false);
		setLikesCount(likesCount - 1);
	} catch (error) {
		console.log(error);
	}
};

// Finds single post by post id.
export const findPostById = (posts, postId) =>
	posts.filter(post => post._id === postId);
