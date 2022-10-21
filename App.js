import React, { useEffect } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import {requestUserPermission} from './src/utility/notificationServices'
import messaging from '@react-native-firebase/messaging'




const App = () => {

  useEffect(() => {
    requestUserPermission()
  },[])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  return(
    <View style={Styles.container}>
      <Text style={Styles.textStyle}>App</Text>
    </View>
  )
}

export default App

const Styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle:{
    color:'#111',
    fontSize:22,
    fontWeight:'700'
  }
})