import { CREATE_GROUP_CHAT, CREATE_PRIVATE_CHAT, MY_CHATS } from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';


export const createPrivateChat = (data) => {
    return apiPost(CREATE_PRIVATE_CHAT, data)
};


export const createGroupChat = (data) => {
    return apiPost(CREATE_GROUP_CHAT, data)
};

export const myChats = (query = "") => {
    return apiGet(MY_CHATS + query)
};




