import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid,Platform} from 'react-native';


export async function requestUserPermission() {

    console.log("PermissionsAndroid.RESULTS.granted",PermissionsAndroid.RESULTS.GRANTED)
    if(Platform.OS == 'android' && Platform.Version >= 33){
    const granted =  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    console.log("grantedgranted",granted)
    if(granted === PermissionsAndroid.RESULTS.GRANTED){
        getFCMToken()
    }else{
        console.log("permission denied")
    }
    }else{
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
          getFCMToken()
        }
    }
}

const getFCMToken = async() =>{
    try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log("token===>>>",token)
    } catch (error) {
        console.log("error during generating token",error)
    }
}

export const notificationListener = async() =>{


    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      //  navigation.navigate(remoteMessage.data.type);
    });

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });


      // firebase notifications dont show in foreground hence use custom library
      messaging().onMessage(async remoteMessage=>{
        console.log("notification on fore ground state", remoteMessage)
        
     
      })
}