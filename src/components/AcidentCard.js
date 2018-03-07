import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'

export default class AcidentCard extends Component {
    render() {
        const { acident: { founderName, phoneNumber, dwLink } } = this.props
        // console.log('--dwlink', dwLink)
        return (
            <Container style={styles.container}>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: dwLink }} />
                                <Body>
                                    <Text>{founderName}</Text>
                                    <Text note>{phoneNumber}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem footer>
                            <Text>10/02/18</Text>
                        </CardItem>
                    </Card>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 120
        // justifyContent: 'center',
    }
})
