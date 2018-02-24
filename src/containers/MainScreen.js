import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native'
import { Container, Header, Content, Left, Body, Right, Title } from 'native-base'
import { LinearGradient } from 'expo'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import LoginStatusMessage from '../components/LoginStatusMessage'
import AuthButton from '../components/AuthButon'
import MainButton from '../components/MainButton'

class MainScreen extends Component {
    render() {
        const { foundPetScreen, lostPetScreen } = this.props
        return (
            <View style={styles.container}>
                <MainButton
                    colors={['#ffa083', '#ff539e']}
                    text={'I found a pet'}
                    onPress={foundPetScreen}
                />
                <MainButton
                    colors={['#ffa57e', '#ff434e']}
                    text={'I lost my pet'}
                    onPress={lostPetScreen}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 0,
        paddingLeft: 20,
        backgroundColor: '#F5FCFF'
    }
})

MainScreen.navigationOptions = {
    title: 'Home Screen',
}
const mapStateToProps = state => ({
    // isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
    lostPetScreen: () => dispatch(NavigationActions.navigate({ routeName: 'LostPet' })),
    foundPetScreen: () => dispatch(NavigationActions.navigate({ routeName: 'FoundPet' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
// export default MainScreen