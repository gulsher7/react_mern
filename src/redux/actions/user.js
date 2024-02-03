import { USER_DETAILS } from '../../config/urls';
import { apiGet } from '../../utils/utils';



export const getUserDetailsById = (query="") => {
  return apiGet(USER_DETAILS+query)
};




