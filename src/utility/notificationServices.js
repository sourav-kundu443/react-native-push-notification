import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

 const getFcmToken = async () =>{
    const fcmToken = await AsyncStorage.getItem('FCM_TOKEN')
    console.log({fcmToken});
    if(!fcmToken){
        try {
            const fcmNewToken = await messaging().getToken()
            if(fcmNewToken){
                console.log({fcmNewToken});
                await AsyncStorage.setItem('FCM_TOKEN',fcmNewToken)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const notificationListner = async () => {
    messaging().onNotificationOpenedApp( remoteMessage => {
        console.log("Notification caused to open from background state:",remoteMessage.notification);
    })

    messaging().getInitialNotification().then( remoteMessage => {
        if(remoteMessage){
            console.log("Notification caused to open from quit state:",remoteMessage.notification);
        }
    })
}