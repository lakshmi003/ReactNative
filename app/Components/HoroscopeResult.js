import React, {Component} from 'react';
import {Text, Alert, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'

export default class HoroscopeResult extends Component {

    constructor() {
        super();
        this.state = {
            description: '',
            intensity: '',
            keywords: '',
            mood: '',
            visible: true
        }
    }

    componentWillMount() {
        fetch('http://sandipbgt.com/theastrologer/api/horoscope/'+this.props.navigation.state.params.name+'/today/')
        .then((response) => response.json())
        .then((responseJson) => {
            let index = responseJson.horoscope.lastIndexOf('(c)');
            this.setState({
                description : (responseJson.horoscope).slice(0,index),
                intensity : responseJson.meta.intensity,
                keywords : responseJson.meta.keywords,
                mood : responseJson.meta.mood,
                visible: false
            })            
        })
        .catch((error) => {
            Alert.alert.error(error);
        });
    }

    render() {
        return (
            <View>
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
                <View>
                    <Text style={styles.text}>{this.state.description}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.text}>Intensity: {this.state.intensity}</Text>
                    <Text style={styles.text}>Keywords: {this.state.keywords}</Text>
                    <Text style={styles.text}>Mood: {this.state.mood}</Text>
                </View>
                <View style={{justifyContent: 'space-between', paddingTop:100, flexDirection: 'column'}}>
                    <Text style={{fontSize:12, textAlign:'center'}}>
                        (c) Kelli Fox, The Astrologer, http://new.theastrologer.com
                    </Text>
                </View>
            </View>    
        );
    }
}
const styles = StyleSheet.create({
    text: {        
        textAlign: 'justify',
        lineHeight: 30,
        padding:5
    },
    group: {
        alignItems : 'flex-end',
        paddingTop : 70
    }
})