import * as auth from "./auth";
import * as posts from './posts';
import * as comment from './comment';

export default {
    ...auth,
    ...posts,
    ...comment

}