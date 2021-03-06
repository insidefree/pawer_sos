import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation'

import MainScreen from '../containers/MainScreen'
import LoginScreen from '../containers/LoginScreen'
import ProfileScreen from '../containers/ProfileScreen'
import FoundPetScreen from '../containers/FoundPetScreen'
import LostPetScreen from '../containers/LostPetScreen'
import StatusListScreen from '../containers/StatusListScreen'
import { addListener } from '../utils/redux'

export const EventsStackNavigator = StackNavigator({
    Main: { screen: MainScreen },
    Login: { screen: LoginScreen },
    FoundPet: { screen: FoundPetScreen },
    LostPet: { screen: LostPetScreen }
})

export const AppNavigator = TabNavigator({
    Events: { screen: EventsStackNavigator },
    StatusList: { screen: StatusListScreen },
    Profile: { screen: LoginScreen }
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