import {
	getAllPosts,
	createAuthHeader,
	deleteComment,
	deletePost,
	likePost,
	unlikePost,
	createPost,
	createComment
} from './api';

// user token import with alias: 'token'
import { LOCAL_STORAGE_USER_TOKEN as token } from '../constants';

//  Handler: fetches user profile data
export const handleGetAllPosts = async (setPosts, setIsLoading) => {
	try {
		setIsLoading && setIsLoading(true);

		const headers = createAuthHeader(token);

		const res = await getAllPosts({ ...headers });

		setPosts(res.data);
		// setIsLoading(false);
	} catch (error) {
		console.log(error);
		// setIsLoading(false);
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

		const res = await deletePost(postId, { ...headers });

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
	setPosts,
	setCommentText
) => {
	try {
		const headers = createAuthHeader(token);

		const body = {
			text: commentText
		};

		await createComment(postId, body, { ...headers });

		handleGetAllPosts(setPosts);

		setCommentText('');
	} catch (error) {
		console.log(error);
	}
};

//  Handler: deletes post comment
export const handleDeleteComment = async (postId, commentId, setPosts) => {
	try {
		const headers = createAuthHeader(token);

		await deleteComment({ ...headers }, postId, commentId);

		handleGetAllPosts(setPosts);
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
	likes,
	user,
	setLiked,
	setLikesCount,
	likesCount
) => {
	try {
		const headers = createAuthHeader(token);

		const res = await unlikePost(postId, { ...headers });

		if (res.data.length === 0) {
			likes.pop();
		} else {
			likes = likes.filter(like => like.user !== user._id);
		}

		setLiked(false);

		setLikesCount(likesCount - 1);
	} catch (error) {
		console.log(error);
	}
};

// Finds single post by post id.
export const findPostById = (posts, postId) =>
	posts.filter(post => post._id === postId);
