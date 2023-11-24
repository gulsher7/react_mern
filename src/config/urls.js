export const API_BASE_URL = "http://localhost:3000"

export const getApiURL = (endpoint) => API_BASE_URL + endpoint

export const SIGNUP_API = getApiURL('/signup');
export const LOGIN_API = getApiURL('/login');
export const OTP_VERIFY = getApiURL('/otpVerify');
export const CREATE_POST = getApiURL('/createPost');
export const ALL_POSTS = getApiURL('/allPost');
export const FILE_UPLOAD = getApiURL('/fileUpload');

//post like_dislike api
export const LIKE_DISLIKE = getApiURL('/likeDislike');
export const POST_LIKES = getApiURL('/postLikes');

//comment api
export const ADD_COMMENT = getApiURL('/addComment');
export const POST_COMMENTS = getApiURL('/postComments');
export const DELETE_COMMENT = getApiURL('/deleteComment');



