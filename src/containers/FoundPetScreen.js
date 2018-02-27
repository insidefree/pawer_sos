import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, KeyboardAvoidingView, TextInput } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import { ImagePicker, Constants } from 'expo'
import b64 from 'base64-js'
import CameraPawer from '../components/CameraPawer'
import { fbAcidents } from '../firebase'
import { firebaseApp, storageRef } from '../firebase'
import { convertToByteArray, atob } from '../utils'

export default class FoundPetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            phoneNumber: null,
            pictureUri: null
        }
    }
    sendNotification = async (name, phoneNumber) => {
        
        try {
            fbAcidents.push().set({
                name,
                phoneNumber
            })
        } catch (error) {
            console.log(error.toString())
        }
        console.log('--state', this.state.pictureUri)
        

    }

    takePicture = async () => {
        const namePic = `picture.jpg`
        const body = new FormData()
        const result = await ImagePicker.launchCameraAsync({
            base64: true,
            quality: 0
        })
        // this.setState({
        //     pictureUri: result.uri
        // })
        body.append("picture", {
            uri: result.uri,
            namePic,
            type: "image/jpg"
        })
        const res = await fetch('https://us-central1-anish-6cd8e.cloudfunctions.net/uploadFileTest', {
            method: "POST",
            body,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        })
    }

    render() {
        const { name, phoneNumber } = this.state
        const { takePicture } = this
        return (
            <Container style={styles.container}>
                <View style={{ height: '60%' }}>
                    <Button
                        success
                        onPress={() => { takePicture() }}>
                        <Text style={{ color: 'white' }}>Take a picture</Text>
                    </Button>
                </View>
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
    }
})