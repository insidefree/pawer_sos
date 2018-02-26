import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import { ImagePicker } from 'expo'
import b64 from 'base64-js'
import CameraPawer from '../components/CameraPawer'
import { fbAcidents } from '../firebase'
import { firebaseApp, storageRef } from '../firebase'
import { convertToByteArray, atob } from '../utils'

export default class FoundPetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phoneNumber: '',
            progress: ''
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

    uploadAsByteArray = async (pickerResultAsByteArray, progressCallback) => {

        try {

            var metadata = {
                contentType: 'image/jpeg',
            };

            var storageRef = firebaseApp.storage().ref();
            var ref = storageRef.child('acidents/mountains.jpg')
            let uploadTask = ref.put(pickerResultAsByteArray, metadata)

            uploadTask.on('state_changed', function (snapshot) {

                progressCallback && progressCallback(snapshot.bytesTransferred / snapshot.totalBytes)

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

            }, function (error) {
                console.log("in _uploadAsByteArray ", error)
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log("_uploadAsByteArray ", uploadTask.snapshot.downloadURL)
            });


        } catch (ee) {
            console.log("when trying to load uploadAsByteArray ", ee)
        }
    }
    takePicture = async () => {

        const result = await ImagePicker.launchCameraAsync({
            base64: true
        })
        // console.log('resul', result)
        console.log('func', this.uploadAsByteArray)
        // storageRef.ref('acidents').child('new_pic.jpg').putString(result.base64, 'base64', { contentType: 'image/jpg' })
        //     .then(function (snapshot) {
        //         console.log('Uploaded a base64 string!');
        //     });

        this.uploadAsByteArray(convertToByteArray(result.base64), (progress) => {
            console.log(progress)
            this.setState({ progress })
        })
    }

    upload = async () => {
        const name = `picture.jpg`;
        const body = new FormData();
        const result = await ImagePicker.launchCameraAsync({
            base64: true
        })
        // console.log('resul', result.uri)
        body.append("picture", {
            uri: result.uri,
            name,
            type: "image/jpg"
        })
        const res = await fetch('https://us-central1-anish-6cd8e.cloudfunctions.net/app/upload', {
            method: "POST",
            body,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        })
        console.log('--res', res)
    }

    render() {
        const { name, phoneNumber } = this.state
        const { takePicture, upload } = this
        return (
            <Container style={styles.container}>
                <View style={{ height: '60%' }}>
                    <Button
                        success
                        onPress={() => { upload() }}>
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
    },
})