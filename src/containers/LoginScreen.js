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
