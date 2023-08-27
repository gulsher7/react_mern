import { combineReducers } from 'redux';
import auth from "./auth";
import types from '../types';
import appSetting from './appSettings'

const appReducer = combineReducers({
    auth,
    appSetting
});
const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined;
    }
    return appReducer(state, action)
}
export default rootReducer;