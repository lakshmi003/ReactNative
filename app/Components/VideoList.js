import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';

export default class VideoList extends Component {

    componentWillMount() {
        fetch('https://rzub7yd2r6.execute-api.us-east-1.amazonaws.com/tarpan_video_url',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(this.props.navigation.state.params)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.payLoad);            
        })
        .catch((error) => {
            Alert.alert.error(error);
        });
    }

    render() {
        return(
            <Text>TBD</Text>
        );
        
    }     
}

const style = StyleSheet.create({
    imgBackground : {
        backgroundColor: '#DDDDDD',
        height:'100%'
    },    
    align : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
        paddingTop : 15,
        paddingBottom: 50        
    }

})