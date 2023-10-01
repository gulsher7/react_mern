import { LOGIN_API, SIGNUP_API } from '../../config/urls';
import { apiPost } from '../../utils/utils';
import { saveUserData } from '../reducers/auth';
import store from '../store';
import types from '../types';
const { dispatch } = store;

export const userLogin = (data) => {
    return new Promise((resolve, reject)=>{
      apiPost(LOGIN_API, data).then((res)=>{
        resolve(res)
        dispatch(saveUserData(res.data))
      }).catch((error)=>{
        reject(error)
      })
    })
  // dispatch(saveUserData(data));
};

export const userSignup = (data) => {
  return apiPost(SIGNUP_API, data)
};


export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
}