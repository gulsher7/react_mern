import { MY_MESSAGES, SEND_MESSAGE } from '../../config/urls';
import { apiGet, apiPost } from '../../utils/utils';


export const sendMessage = (data) => {
    return apiPost(SEND_MESSAGE, data)
};

export const myMessages = (query = "") => {
    return apiGet(MY_MESSAGES + query)
};




