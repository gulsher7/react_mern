import { ADD_COMMENT, DELETE_COMMENT, POST_COMMENTS } from '../../config/urls';
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




