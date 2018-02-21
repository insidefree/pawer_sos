import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase'
import { firebaseApp } from '../firebase'

class LoginScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user != null) {
                console.log(user)
            }
        })
    }

    signUpUser = (email, password) => {
        try {
            if (this.state.password.length < 6) {
                alert('Please enter atleast 6 characters')
                return
            }
            firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        } catch (error) {
            console.log(error.toString())
        }
    }

    loginUser = (email, password) => {
        try {
            firebaseApp.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user)
                })
        } catch (error) {
            console.log(error.toString())
        }
    }

    async loginWithFacebook() {
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('174623653159521', { permissions: ['public_profile'] })
        if (type == 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebaseApp.auth().signInWithCredential(credential)
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ email })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={password => this.setState({ password })}
                        />
                    </Item>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        success
                        onPress={() => this.loginUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.signUpUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </Button>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => this.loginWithFacebook()}
                    >
                        <Text style={{ color: 'white' }}>Login with Facebook</Text>
                    </Button>
                </Form>

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

export default LoginScreen