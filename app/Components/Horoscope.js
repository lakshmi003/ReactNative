import React, {Component} from 'react';
import {Text,ScrollView, View, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width;

export default class Horoscope extends Component {
    render() {
        return(
            <ScrollView>
                <View style={style.align}>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'aries'})} style={style.box}>
                            <Image source={require('../images/aries.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'taurus'})} style={style.box}>
                            <Image source={require('../images/taurus.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'gemini'})} style={style.box}>
                            <Image source={require('../images/gemini.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'cancer'})} style={style.box}>
                            <Image source={require('../images/cancer.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'leo'})} style={style.box}>
                            <Image source={require('../images/leo.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'virgo'})} style={style.box}>
                            <Image source={require('../images/virgo.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'libra'})} style={style.box}>
                            <Image source={require('../images/libra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'scorpio'})} style={style.box}>
                            <Image source={require('../images/scorpio.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'sagittarius'})} style={style.box}>
                            <Image source={require('../images/sagittariu.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'capricorn'})} style={style.box}>
                            <Image source={require('../images/capricorn.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'aquarius'})} style={style.box}>
                            <Image source={require('../images/aquarius.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'pisces'})} style={style.box}>
                            <Image source={require('../images/pisces.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>    
            </ScrollView>
        );
        
    }     
}

const style = StyleSheet.create({
    align : {
        marginTop:'30%'
    },
    container : {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        height:70,
        margin:12,
        marginTop:'0.5%',
        width: (width/3-25),
        alignItems:'center',
        justifyContent: 'space-around',
        backgroundColor: '#DDDDDD'
    }
})