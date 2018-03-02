import React, { Component } from "react"
import {
    View,
    Text,
    StyleSheet
} from "react-native"
import b64 from 'base64-js'
import { Camera, Permissions, TouchableOpacity, ImagePicker } from 'expo'
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebaseApp } from '../firebase'
class CameraPawer extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    snap = async () => {
        if (this.camera) {
            // let photo = await this.camera.takePictureAsync()
            // console.log('photo', photo)
            
            const result = await ImagePicker.launchCameraAsync({
                base64: true
            })
            const byteArray = b64.toByteArray(result.base64)
            const metadata = { contentType: 'image/jpg' };
            firebaseApp.storage().ref('/acidents').child('my_pic.jpg').put(byteArray, metadata).then(snapshot => {
                console.log("uploaded image!")
            })
        }
    }



    render() {
        const { hasCameraPermission } = this.state

        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        style={{ flex: 1, justifyContent: 'space-between' }}
                        type={this.state.type}
                        ref={ref => { this.camera = ref }}>

                        <Header searchBar rounded
                            style={{
                                position: 'absolute', backgroundColor: 'transparent',
                                left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
                            }}
                        >
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Icon name="logo-snapchat" style={{ color: 'white' }} />
                                <Item style={{ backgroundColor: 'transparent' }}>
                                    <Icon name="ios-search" style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}></Icon>

                                    <Input
                                        placeholder="Search"
                                        placeholderTextColor="white"
                                    />


                                </Item>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }} />
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="ios-reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
                            </View>
                        </Header>

                        <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                            <Button onPress={() => { this.snap() }} transparent style={{ paddingBottom: 50 }}>
                                <MaterialCommunityIcons
                                    name="circle-outline"
                                    style={{ color: 'white', fontSize: 100 }}>
                                </MaterialCommunityIcons>
                            </Button>
                        </View>


                    </Camera>
                </View>
            )
        }
    }
}
export default CameraPawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});