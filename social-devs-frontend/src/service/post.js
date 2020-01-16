import { getAllPostsReq, createAuthHeader, deleteCommentReq } from './api';

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
