import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Title, Footer, Thumbnail, Card } from 'native-base'
import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { acidentsRef } from '../firebase'
import { convertToByteArray, atob } from '../utils'

export class FoundPetScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            founderName: '',
            phoneNumber: '',
            photo: '',
            dwLink: '',
            spinner: false
        }
    }

    sendNotification = (founderName, phoneNumber) => {
        try {
            acidentsRef.push().set({
                founderName,
                phoneNumber,
                dwLink: this.state.dwLink
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

    sendPhoto = async (founderName, phoneNumber) => {
        const name = `${this.state.founderName}_${Date.now()}.jpg`
        const body = new FormData();
        const dwLink = `http://storage.googleapis.com/anish-6cd8e.appspot.com/acidentPhotos/${encodeURIComponent(name)}`
        body.append(name, {
            uri: this.state.photo,
            name,
            type: "image/jpg"
        })
        // body.append('fields', JSON.stringify({
        //     founderName: this.state.founderName,
        //     phoneNumber: this.state.phoneNumber
        // }))
        const res = await fetch('https://us-central1-anish-6cd8e.cloudfunctions.net/uploadFileTest', {
            method: "POST",
            body,
            headers: {
                Accept: "application/json"
                // "Content-Type": "multipart/form-data"
            }
        })

        try {
            acidentsRef.push().set({
                founderName,
                phoneNumber,
                dwLink
            })
        } catch (error) {
            console.log(error.toString())
        }
        this.props.resetMainScreenAction()
        this.props.statusListScreenAction()
    }

    render() {
        const { founderName, phoneNumber } = this.state
        const { takePicture } = this
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.imageView}>
                        {this.state.photo ?
                            <Image
                                style={{
                                    flex: 6,
                                    resizeMode: 'contain',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    justifyContent: 'center',
                                }}
                                source={{ uri: this.state.photo }}
                            /> : <View></View>}
                        <TouchableOpacity onPress={() => { takePicture() }}>
                            <Image
                                style={{alignSelf: 'center', width: 100, height: 100}}
                                source={require('../assets/images/clipart.jpg')}
                            />
                        </TouchableOpacity>
                        
                    </View>
                    <Form style={styles.form}>
                        <Item floatingLabel>
                            <Label>Owner name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={founderName => this.setState({ founderName })}
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
                    </Form>
                    <View style={styles.btnView}>
                        <Button
                            style={{}}
                            full
                            rounded
                            success
                            onPress={() => { this.sendPhoto(founderName, phoneNumber) }}
                        >
                            <Text style={{ color: 'white' }}>Send notification</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    },
    imageView: {
        flex: 6, justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D5DB',
        backgroundColor: 'skyblue'
    },
    form: {
        flex: 1,
        justifyContent: 'center'
    },
    btnView: {
        flex: 1,
        justifyContent: 'center'
    }
    // modalContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: 'grey',
    // },
    // innerContainer: {
    //     alignItems: 'center',
    // }
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