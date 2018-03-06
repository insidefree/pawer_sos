import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'native-base'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

class Profile extends Component {
    render() {
        const { signOut } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Profile
                </Text>
                <Button
                    onPress={() => signOut()}>
                    <Text>Log out</Text>
                </Button>
            </View>
        )
    }
}



export default Profile