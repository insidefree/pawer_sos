import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Title, Footer, Thumbnail } from 'native-base'
import { ImagePicker } from 'expo'
import { fbAcidents } from '../firebase'
import { convertToByteArray, atob } from '../utils'

export default class FoundPetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ownerName: '',
            phoneNumber: '',
            animalName: '',
            photo: ''
        }
    }
    sendNotification = (name, phoneNumber, animalName) => {
        try {
            fbAcidents.push().set({
                name,
                phoneNumber,
                animalName
            })
        } catch (error) {
            console.log(error.toString())
        }
    }


    takePicture = async () => {
        const name = `picture.jpg`;
        const body = new FormData();
        const result = await ImagePicker.launchCameraAsync({
            quality: 0
        })
        console.log(result.uri)
        this.setState({
            photo: result.uri
        })
        body.append("picture", {
            uri: result.uri,
            name,
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
        const { ownerName, phoneNumber, animalName } = this.state
        const { takePicture } = this

        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <Item style={{ justifyContent: 'center', alignItems: 'center', height: '70%', marginLeft: -15 }}>
                            {!this.state.photo ?
                                <Image
                                    style={{
                                        backgroundColor: '#ccc',
                                        flex: 1,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                    }}

                                    source={require('../assets/images/cool-background.jpg')}
                                /> :
                                <Image
                                    style={{
                                        backgroundColor: '#ccc',
                                        flex: 1,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                    }}

                                    source={{uri: this.state.photo}}
                                />
                            }

                            <Button
                                onPress={() => { takePicture() }}
                                style={{ alignSelf: 'center' }}>
                                <Thumbnail square size={220} source={require('../assets/images/clipart.jpg')} />
                            </Button>
                        </Item>
                        <Item floatingLabel style={{ height: '10%' }}>
                            <Label>Owner name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={ownerName => this.setState({ ownerName })}
                            />
                        </Item>
                        <Item floatingLabel style={{ height: '10%' }}>
                            <Label>Phone number</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            />
                        </Item>
                        <Item floatingLabel style={{ height: '10%' }}>
                            <Label>Animal name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={animalName => this.setState({ animalName })}
                            />
                        </Item>
                        <Button
                            style={{ marginTop: 30 }}
                            full
                            rounded
                            success
                            onPress={() => { this.sendNotification(ownerName, phoneNumber, animalName) }}
                        >
                            <Text style={{ color: 'white' }}>Send notification</Text>
                        </Button>
                    </Form>
                </Content>
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