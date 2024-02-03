import { FETCH_USERS_BY_IDS, USER_DETAILS } from '../../config/urls';
import { apiGet } from '../../utils/utils';



export const getUserDetailsById = (query="") => {
  return apiGet(USER_DETAILS+query)
};


export const getUsersByIds = (query="") => {
  return apiGet(FETCH_USERS_BY_IDS+query)
};




