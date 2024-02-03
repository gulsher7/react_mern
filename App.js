//import liraries
import React, { useEffect } from 'react';
import Routes from './src/Navigations/Routes';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { changeLang } from './src/redux/reducers/appSettings';
import strings from './src/constants/lang';
import { changeAppTheme, changeLanguage, storeUserData } from './src/redux/actions/appSettings';
import { getData } from './src/utils/helperFunctions';
import FlashMessage from "react-native-flash-message";
import fontFamily from './src/styles/fontFamily';
import { textScale } from './src/styles/responsiveSize';
import { saveUserData } from './src/redux/reducers/auth';

const {dispatch} = store

const App = () => {

  useEffect(() => {
    initiateLang()
    initiateTheme()
    initUser()
  }, [])


  const initUser = async() =>{
    try {
      let data = await getData('userData')
      if (!!data) {
        dispatch(saveUserData(JSON.parse(data)));
      }
    } catch (error) {
      console.log("no data found")
    }
  }
  const initiateTheme = async () => {
    try {
      let myTheme = await getData('theme')
      if (!!myTheme) {
        changeAppTheme(myTheme)
      }
    } catch (error) {
      console.log("no data found")
    }
  }


  const initiateLang = async () => {
    try {
      let myLang = await getData('language')
      if (!!myLang) {
        changeLanguage(myLang)
      }
    } catch (error) {
      console.log("no data found")
    }
  }

  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage
        position={'top'}
        titleStyle={{
          fontFamily:fontFamily.medium,
          fontSize: textScale(14)
        }}
      />
    </Provider>
  );
};

export default App;