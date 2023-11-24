import { ADD_COMMENT, ALL_POSTS, CREATE_POST, DELETE_COMMENT, LIKE_DISLIKE, POST_COMMENTS, POST_LIKES } from '../../config/urls';
import { apiDelete, apiGet, apiPost } from '../../utils/utils';


export const addComment = (data) => {

    return apiPost(ADD_COMMENT, data)

};


export const deleteComment = (data) => {
  return apiDelete(DELETE_COMMENT,data)
};

export const postComments = (query="") => {
  return apiGet(POST_COMMENTS+query)
};




