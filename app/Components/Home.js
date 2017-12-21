import React, {Component} from 'react';
import {View, TouchableHighlight, Image} from 'react-native';

export default class Home extends Component {
    
    goToScreen(name) {
        switch(name) {
            case "video":
                this.props.navigation.navigate('VideoScreen');
                break;
            case "horoscope":
                this.props.navigation.navigate('VideoScreen');
                break;    
        }
    }

    render() {
        return (
            <TouchableHighlight onPress={() => this.goToScreen('video').bind(this)}>
                <Image source={require('../images/starttarpan.png')}/>
            </TouchableHighlight>
        );
    }
}
