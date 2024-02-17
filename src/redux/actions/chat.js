import { CHAT_BY_ID, CREATE_GROUP_CHAT, CREATE_PRIVATE_CHAT, MY_CHATS } from '../../config/urls';
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

export const chatById = (query = "") => {
    return apiGet(CHAT_BY_ID + query)
};




