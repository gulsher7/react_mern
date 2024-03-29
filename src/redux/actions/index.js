import * as auth from "./auth";
import * as posts from './posts';
import * as comment from './comment';
import * as chat from './chat';
import * as messages from './messages';
import * as user from './user';

export default {
    ...auth,
    ...posts,
    ...comment,
    ...chat,
    ...messages,
    ...user
}