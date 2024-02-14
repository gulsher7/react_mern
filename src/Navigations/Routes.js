import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useSelector } from 'react-redux';
import { Linking, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NAVIGATION_IDS = ['login','signup'];

const Stack = createNativeStackNavigator();


function buildDeepLinkFromNotificationData(data) {
    console.log("on click data",data)
    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
      console.warn('Unverified navigationId', navigationId)
      return null;
    }
    if (navigationId === 'signup') {
      return 'myapp://signup';
    }
  
    const chatId = data?.chatId;
    if (navigationId === 'login') {
      return `myapp://login/${chatId}`
    }
    console.warn('Missing postId')
    return null
  }
  

  const linking = {
    prefixes: ["myapp://"],
    config: {
    screens: {
            login: 'login/:id',
            signup: 'signup',
    },
    },
    async getInitialURL() {
        const url = await Linking.getInitialURL();
        if (typeof url === 'string') {
          return url;
        }
        //getInitialNotification: When the application is opened from a quit state.
        const message = await messaging().getInitialNotification();
        const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
        if (typeof deeplinkURL === 'string') {
          return deeplinkURL;
        }
      },
      subscribe(listener) {
        const onReceiveURL = ({url}) => listener(url);
    
        // Listen to incoming links from deep linking
        const linkingSubscription = Linking.addEventListener('url', onReceiveURL);
    
        //onNotificationOpenedApp: When the application is running, but in the background.
        const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
          const url = buildDeepLinkFromNotificationData(remoteMessage.data)
          if (typeof url === 'string') {
            listener(url)
          }
        });
    
        return () => {
          linkingSubscription.remove();
          unsubscribe();
        };
      },
  };
  

export default function Routes() {
    const userData = useSelector(state=>state.auth.userData)

    console.log("userData", userData)
  
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <Stack.Navigator>

            {!!userData?.token ?  MainStack(Stack):AuthStack(Stack)}     
   
            </Stack.Navigator>

        </NavigationContainer>
    );
}