import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'

import LoginScreen from '../containers/LoginScreen'
import MainScreen from '../containers/MainScreen'
import ProfileScreen from '../containers/ProfileScreen'
import { addListener } from '../utils/redux'

export const AppNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
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