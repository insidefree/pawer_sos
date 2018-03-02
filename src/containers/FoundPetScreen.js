import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Title, Footer, Thumbnail } from 'native-base'
import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fbAcidents } from '../firebase'
import { convertToByteArray, atob } from '../utils'

export class FoundPetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ownerName: '',
            phoneNumber: '',
            photo: '',
            spinner: false
        }
    }

    sendNotification = (name, phoneNumber) => {
        try {
            fbAcidents.push().set({
                name,
                phoneNumber,
            })
        } catch (error) {
            console.log(error.toString())
        }
        this.sendPhoto()
        this.props.resetMainScreenAction()
        this.props.statusListScreenAction()        
    }


    takePicture = async () => {
        const result = await ImagePicker.launchCameraAsync({
            quality: 0
        })
        console.log(result.uri)
        this.setState({
            photo: result.uri,
        })
    }

    sendPhoto = async () => {
        const name = `${this.state.ownerName}_${Date.now()}.jpg`
        const body = new FormData();
        body.append(name, {
            uri: this.state.photo,
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
                    <View></View>
                    <Form>
                        <Item style={{ justifyContent: 'center', alignItems: 'center', height: '85%', marginLeft: -15 }}>
                            <ImageBackground
                                source={require('../assets/images/cool-background.jpg')}
                                style={{ width: '100%', height: '100%', justifyContent: 'center' }}
                            >
                                {this.state.photo ?
                                    <Image
                                        style={{
                                            flex: 1,
                                            resizeMode: 'contain',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            justifyContent: 'center',
                                        }}

                                        source={{ uri: this.state.photo }}
                                    /> : <Text></Text>}
                                <Button
                                    onPress={() => { takePicture() }}
                                    style={{ alignSelf: 'center' }}>
                                    <Thumbnail square size={220} source={require('../assets/images/clipart.jpg')} />
                                </Button>
                            </ImageBackground>
                        </Item>
                        <Item floatingLabel style={{ height: '15%' }}>
                            <Label>Owner name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={ownerName => this.setState({ ownerName })}
                            />
                        </Item>
                        <Item floatingLabel style={{ height: '15%' }}>
                            <Label>Phone number</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            />
                        </Item>

                        <Button
                            style={{ marginTop: 30 }}
                            full
                            rounded
                            success
                            onPress={() => { this.sendNotification(ownerName, phoneNumber) }}
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

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    statusListScreenAction: () => dispatch(NavigationActions.navigate({
        routeName: 'StatusList'
    })),
    resetMainScreenAction: () => dispatch(NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Main' }),
        ],
    }))
})

export default connect(mapStateToProps, mapDispatchToProps)(FoundPetScreen)