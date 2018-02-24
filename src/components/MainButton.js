import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'


class MainButton extends Component {

    render() {
        const { colors, text, onPress } = this.props
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => onPress()}
                >
                    <LinearGradient
                        colors={colors}
                        style={styles.button}
                    >
                        <Text
                            style={{
                                backgroundColor: 'transparent',
                                fontSize: 25,
                                color: '#fff'
                            }}>
                            {text}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        height: '100%',
    }
})

export default MainButton