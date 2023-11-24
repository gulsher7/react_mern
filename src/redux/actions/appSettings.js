import strings from '../../constants/lang';
import { storeData } from '../../utils/helperFunctions';
import { changeLang,changeTheme } from '../reducers/appSettings';
import { saveUserData } from '../reducers/auth';
import store from '../store';
const { dispatch } = store;



export const changeLanguage = (data) => {
  strings.setLanguage(data)
  storeData('language',data).then((res)=>{
    dispatch(changeLang(data));
  }).catch((error)=>{
    console.log("error during store data")
  })


  dispatch(changeLang(data));
};

export const changeAppTheme = (data) => {
    storeData('theme',data).then((res)=>{
      dispatch(changeTheme(data));
    }).catch((error)=>{
      console.log("error during store data")
    })
};

