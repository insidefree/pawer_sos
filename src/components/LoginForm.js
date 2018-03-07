import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase'
import { firebaseApp, usersAcRef } from '../firebase'
import { Permissions, Notifications } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'


class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        const {signUpUser, loginUser, loginWithFacebook, registerForPushNotificationsAsync} = this.props
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
                        onPress={() => loginUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Login</Text>
                    </Button>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => signUpUser(this.state.email, this.state.password)}
                    >
                        <Text style={{ color: 'white' }}>Sign Up</Text>
                    </Button>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        primary
                        onPress={() => loginWithFacebook()}
                    >
                        <Text style={{ color: 'white' }}>Login with Facebook</Text>
                    </Button>
                </Form>

            </Container>
        )
    }
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

export default LoginForm
