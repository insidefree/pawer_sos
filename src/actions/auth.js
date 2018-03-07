import * as firebase from 'firebase'
import { Permissions, Notifications } from 'expo'
import constants from '../constants'
import { firebaseApp, usersAcRef } from '../firebase'

export const signUpUser = (email, password) => {
    return dispatch => {
        try {
            firebaseApp.auth().createUserWithEmailAndPassword(email, password)
                .then(user => {
                    usersAcRef.child(user.uid).set({ uid: user.uid, email })
                    return user
                })
                .then(user => {
                    console.log('--register')
                    registerForPushNotificationsAsync(user)
                    // dispatch({ type: constants.AUTH_REGISTER_FOR_PUSH_NOTIFICATIONS_ASYNC, user })
                    dispatch({ type: constants.AUTH_USER_IS_AUTH, isAuth: true })
                })
            // .then(() => {
            //     this.props.profileScreen()
            // })
        } catch (error) {
            console.log(error.toString())
        }
    }
}

export const loginUser = (email, password) => {
    return dispatch => {
        try {
            firebaseApp.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    registerForPushNotificationsAsync(user)
                    // dispatch({ type: constants.AUTH_REGISTER_FOR_PUSH_NOTIFICATIONS_ASYNC, user })
                    dispatch({ type: constants.AUTH_USER_IS_AUTH, isAuth: true })
                })
        } catch (error) {
            console.log(error.toString())
        }
    }
}

export const registerForPushNotificationsAsync = async (user) => {
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
    console.log('--finish')
}
export const loginWithFacebook = () => {
    return async dispatch => {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('174623653159521', { permissions: ['public_profile'] })
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebaseApp.auth().signInWithCredential(credential)
                .catch(error => console.log(error))
            dispatch({ type: constants.AUTH_USER_IS_AUTH, isAuth: true })
        }
    }
}

export const signOut = () => {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            dispatch({ type: constants.AUTH_USER_SIGN_OUT, isAuth: false })
            console.log('sign out done')
        }).catch(function (error) {
            console.log('sign out error', error)
        });
    }
}