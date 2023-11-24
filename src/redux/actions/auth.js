import { FILE_UPLOAD, LOGIN_API, OTP_VERIFY, SIGNUP_API } from '../../config/urls';
import { storeData } from '../../utils/helperFunctions';
import { apiPost } from '../../utils/utils';
import { saveUserData } from '../reducers/auth';
import store from '../store';
import types from '../types';
const { dispatch } = store;


export const userLogin = (data) => {
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data).then((res) => {
      console.log("get res+++", res)
      if (!!res.data && !!res?.data?.validOTP) {
        storeData('userData', res.data).then((value) => {
          console.log("im here")
          dispatch(saveUserData(res.data))
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      } else {
        resolve(res)
      }
    }).catch((error) => {
      reject(error)
    })
  })
  // dispatch(saveUserData(data));
};

export const otpVerify = (data, token = null) => {
  return new Promise((resolve, reject) => {
    apiPost(OTP_VERIFY, data).then((res) => {
      if (!!res?.data) {
        let addToken = {...res.data, token}
        storeData('userData', addToken).then((value) => {
          console.log("im here")
          dispatch(saveUserData(addToken))
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      } else {
        resolve(res)
      }
    }).catch((error) => {
      reject(error)
    })
  })
  // dispatch(saveUserData(data));
};

export const userSignup = (data) => {
  return apiPost(SIGNUP_API, data)
};

export const fileUpload = (data) => {
  return apiPost(FILE_UPLOAD, data)
};


export function logout() {
  dispatch({ type: types.CLEAR_REDUX_STATE });
}