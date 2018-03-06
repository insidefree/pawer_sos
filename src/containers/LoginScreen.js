import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase'
import { firebaseApp, usersAcRef } from '../firebase'
import { Permissions, Notifications } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import LoginForm from '../components/LoginForm'
import Profile from '../components/Profile'

// actions
import { signUpUser, loginUser, loginWithFacebook, registerForPushNotificationsAsync, signOut } from '../actions/auth'

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isAuth: false
        }
    }

    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log('didMount', user)
                this.setState({
                    isAuth: true
                })
            }
        })
    }

    // signUpUser = (email, password) => {
    //     try {
    //         if (this.state.password.length < 6) {
    //             alert('Please enter atleast 6 characters')
    //             return
    //         }
    //         firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    //             .then(user => {
    //                 usersAcRef.child(user.uid).set({ uid: user.uid, email })
    //                 return user
    //             })
    //             .then(user => {
    //                 this.registerForPushNotificationsAsync(user)
    //             })
    //             .then(() => {
    //                 this.props.profileScreen()
    //             })
    //     } catch (error) {
    //         console.log(error.toString())
    //     }
    // }

    // loginUser = (email, password) => {
    //     try {
    //         firebaseApp.auth().signInWithEmailAndPassword(email, password)
    //             .then(user => {
    //                 this.registerForPushNotificationsAsync(user)
    //             })
    //             .then(() => {
    //                 this.props.profileScreen()
    //             })
    //     } catch (error) {
    //         console.log(error.toString())
    //     }
    // }

    // registerForPushNotificationsAsync = async (user) => {
    //     const { status: existingStatus } = await Permissions.getAsync(
    //         Permissions.NOTIFICATIONS
    //     );
    //     let finalStatus = existingStatus;

    //     // only ask if permissions have not already been determined, because
    //     // iOS won't necessarily prompt the user a second time.
    //     if (existingStatus !== 'granted') {
    //         // Android remote notification permissions are granted during the app
    //         // install, so this will only ask on iOS
    //         const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //         finalStatus = status;
    //     }

    //     // Stop here if the user did not grant permissions
    //     if (finalStatus !== 'granted') {
    //         return;
    //     }

    //     // Get the token that uniquely identifies this device
    //     let token = await Notifications.getExpoPushTokenAsync();

    //     // POST the token to our backend so we can use it to send pushes from there
    //     var updates = {}
    //     updates['/expoToken'] = token
    //     console.log(`--user: ${JSON.stringify(user)}`)
    //     firebaseApp.database().ref('usersac').child(user.uid).update(updates)
    //     //  firebase.database().ref('userac' + user.uid).set({
    //     //   expoToken : token
    //     // });
    //     //call the push notification 
    // }
    // async loginWithFacebook() {
    //     const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('174623653159521', { permissions: ['public_profile'] })
    //     if (type == 'success') {
    //         const credential = firebase.auth.FacebookAuthProvider.credential(token)
    //         firebaseApp.auth().signInWithCredential(credential)
    //             .catch(error => console.log(error))
    //     }
    // }

    render() {
        const { isAuth } = this.props
        const { signUpUser, loginUser, loginWithFacebook, registerForPushNotificationsAsync, signOut } = this.props
        return (
            <Container style={styles.container}>
                {!isAuth ?
                    <LoginForm
                        signUpUser={signUpUser}
                        loginUser={loginUser}
                        loginWithFacebook={loginWithFacebook}
                        registerForPushNotificationsAsync={registerForPushNotificationsAsync}
                    /> :
                    <Profile
                        signOut={signOut} />
                }
            </Container>
        )
    }
}


LoginScreen.navigationOptions = {
    title: 'Log In',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch => ({
    signUpUser: bindActionCreators(signUpUser, dispatch),
    loginUser: bindActionCreators(loginUser, dispatch),
    loginWithFacebook: bindActionCreators(loginWithFacebook, dispatch),
    registerForPushNotificationsAsync: bindActionCreators(registerForPushNotificationsAsync, dispatch),
    signOut: bindActionCreators(signOut, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
