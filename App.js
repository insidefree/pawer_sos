import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { Permissions, Notifications } from 'expo'
import { createStore, applyMiddleware } from 'redux'
import * as firebase from 'firebase'
import { firebaseApp } from './src/firebase'

import AppReducer from './src/reducers'
import AppWithNavigationState from './src/navigators/AppNavigator'
import { middleware } from './src/utils/redux'

const store = createStore(
  AppReducer,
  applyMiddleware(middleware),
)

export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  componentDidMount = () => {
    firebaseApp.auth().signInWithEmailAndPassword('b@b.com', 'bbbbbb')
      .then(user => {
        this.registerForPushNotificationsAsync(user)
      })
  }
  registerForPushNotificationsAsync = async (user) => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

     // POST the token to our backend so we can use it to send pushes from there
     var updates = {}
     updates['/expoToken'] = token
     console.log(`--user: ${JSON.stringify(user)}`)
     firebaseApp.database().ref('usersac').child(user.uid).update(updates)
    //  firebase.database().ref('userac' + user.uid).set({
    //   expoToken : token
    // });
     //call the push notification 
  }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
