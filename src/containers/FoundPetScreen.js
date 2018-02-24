import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

import CameraPawer from '../components/CameraPawer'
import { fbAcidents } from '../firebase'


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
            fbAcidents.push().set({
                name,
                phoneNumber
            })
        } catch (error) {
            console.log(error.toString())
        }
    }

    render() {
        const { name, phoneNumber } = this.state

        return (
            <Container style={styles.container}>
                <CameraPawer />
                <Form>
                    <Item floatingLabel>
                        <Label>Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={name => this.setState({ name })}
                        />
                    </Item>
                    <Item floatingLabel>
                        <Label>Phone number</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={phoneNumber => this.setState({ phoneNumber })}
                        />
                    </Item>
                    <Button
                        style={{ marginTop: 10 }}
                        full
                        rounded
                        success
                        onPress={() => { this.sendNotification(name, phoneNumber) }}
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