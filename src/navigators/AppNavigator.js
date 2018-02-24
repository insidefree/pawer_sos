import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'

import MainScreen from '../containers/MainScreen'
import LoginScreen from '../containers/LoginScreen'
import ProfileScreen from '../containers/ProfileScreen'
import FoundPetScreen from '../containers/FoundPetScreen'
import LostPetScreen from '../containers/LostPetScreen'
import { addListener } from '../utils/redux'

export const AppNavigator = StackNavigator({
    Main: { screen: MainScreen },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
    FoundPet: { screen: FoundPetScreen },
    LostPet: { screen: LostPetScreen },
})

class AppWithNavigationState extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    }

    render() {
        // console.log(`AppNavigator: ${JSON.stringify(this.props.dispatch({type: 'asd'}))}`)
        const { dispatch, nav } = this.props
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch,
                    state: nav,
                    addListener,
                })}
            />
        )
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)