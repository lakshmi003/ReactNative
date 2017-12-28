import React, {Component} from 'react';
import {Text, Alert, StyleSheet} from 'react-native';

export default class HoroscopeResult extends Component {

    constructor() {
        super();
        this.state = {description: ''}
    }

    componentWillMount() {
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
            <Text style={styles.text}>{this.state.description}</Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {        
        textAlign: 'justify',
        lineHeight: 30,
        padding:5
    }
})