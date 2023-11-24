import { ALL_POSTS, CREATE_POST, LIKE_DISLIKE, POST_LIKES } from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';
import store from '../store';
const { dispatch } = store;


export const createPost = (data) => {

    return apiPost(CREATE_POST, data)

};

export const getAllPost = (query="") => {
  return apiGet(ALL_POSTS+query)
};

export const likeDislike = (data) => {
  return apiPost(LIKE_DISLIKE,data)
};

export const postLikes = (query="") => {
  return apiGet(POST_LIKES+query)
};




