import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, ImageBackground, FlatList } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'
import { ImagePicker } from 'expo'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { acidentsRef } from '../firebase'
import { convertToByteArray, atob } from '../utils'


// actions
import { fetchAcidentsFirstLoad } from '../actions/acidents'

// components
import AcidentCard from '../components/AcidentCard'


export class StatusListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.fetchAcidentsFirstLoad()
    }

    render() {
        // const { ownerName, phoneNumber, animalName } = this.state
        const { acidentsList } = this.props
        console.log('--acidents', this.props)
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item, index) => item.founderName}
                    data={acidentsList}
                    renderItem={({ item }) => <AcidentCard acident={item} />}
                />
            </View>
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
    acidentsList: state.acidents.acidentsList
})

const mapDispatchToProps = dispatch => ({
    fetchAcidentsFirstLoad: bindActionCreators(fetchAcidentsFirstLoad, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StatusListScreen)