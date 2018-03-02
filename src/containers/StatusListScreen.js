import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fbAcidents } from '../firebase'
import { convertToByteArray, atob } from '../utils'

export class StatusListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { ownerName, phoneNumber, animalName } = this.state
        const { takePicture } = this
        return (
            <Container style={styles.container}>
                <Content>
                <Header><Text>Status List</Text></Header>
                    <Card>
                        <CardItem header>
                            <Text>NativeBase</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>
                                //Your text here
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text>GeekyAnts</Text>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StatusListScreen)