import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import { createStore, applyMiddleware } from 'redux'
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

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
