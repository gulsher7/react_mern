import { ALL_POSTS, CREATE_POST, LIKE_DISLIKE, MY_POSTS } from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';
import store from '../store';



export const createPost = (data) => {

    return apiPost(CREATE_POST, data)

};

export const getAllPost = (query="") => {
  return apiGet(ALL_POSTS+query)
};

export const getMyPosts = (query="") => {
  return apiGet(MY_POSTS+query)
};

export const likeDislike = (data) => {
  return apiPost(LIKE_DISLIKE,data)
};





