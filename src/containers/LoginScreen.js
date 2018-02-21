import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, View } from 'react-native'


class LoginScreen extends Component {
    render() {
        console.log(`login props: ${JSON.stringify(this.props)}`)
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Screen A
                </Text>
                <Text style={styles.instructions}>
                    This is great
                </Text>
                <Button
                    onPress={() => navigation.dispatch({ type: 'Login' })}
                    title="Log in"
                />
            </View>
        )
    }
}

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

LoginScreen.navigationOptions = {
    title: 'Log In',
}

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
})

export default LoginScreen