import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import { firebaseApp } from '../firebase'


export default class FoundPetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phoneNumber: ''
        }
    }
    sendNotification = (name, phoneNumber) => {
        try {
            // firebaseApp.auth().signInWithEmailAndPassword(name, phoneNumber)
            //     .then(user => {
            //         console.log(user)
            //     })
        } catch (error) {
            // console.log(error.toString())
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    <Item floatingLabel>
                        <Label>Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={email => this.setState({ name })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Phone number</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={password => this.setState({ phoneNumber })}
                        />
                    </Item>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        success
                        onPress={() => { this.sendNotification(this.state.name, this.state.phoneNumber) }}
                    >
                        <Text style={{ color: 'white' }}>Send notification</Text>
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
})