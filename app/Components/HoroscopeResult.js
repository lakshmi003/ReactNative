import React, {Component} from 'react';
import {Text, Alert} from 'react-native';

export default class HoroscopeResult extends Component {

    constructor() {
        super();
        this.state = {description: ''}
    }

    componentWillMount() {
        //let horoscopeName = 
        fetch('http://sandipbgt.com/theastrologer/api/horoscope/'+this.props.navigation.state.params.name+'/today/')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({description : responseJson.horoscope})
        })
        .catch((error) => {
            Alert.alert.error(error);
        });
    }

    render() {
        return (
            <Text>{this.state.description}</Text>
        );
    }
}
