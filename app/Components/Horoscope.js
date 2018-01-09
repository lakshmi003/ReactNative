import React, {Component} from 'react';
import {Text,ScrollView, View, TouchableOpacity, Image, StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width;

export default class Horoscope extends Component {
    render() {
        return(
            <ScrollView style={{backgroundColor:'#DDDDDD'}}>
                <Image source={require('../images/photo.png')} style={style.backgroundImage}></Image>
                <View style={style.align}>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'aries',imgSrc:require('../images/aries.png')})} style={style.box}>
                            <Image source={require('../images/aries.png')}></Image>
                            <Text style={style.text}>ARIES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'taurus',imgSrc:require('../images/taurus.png')})} style={style.box}>
                            <Image source={require('../images/taurus.png')}></Image>
                            <Text style={style.text}>TAURUS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'gemini',imgSrc:require('../images/gemini.png')})} style={style.box}>
                            <Image source={require('../images/gemini.png')}></Image>
                            <Text style={style.text}>GEMINI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'cancer',imgSrc:require('../images/cancer.png')})} style={style.box}>
                            <Image source={require('../images/cancer.png')}></Image>
                            <Text style={style.text}>CANCER</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'leo',imgSrc:require('../images/leo.png')})} style={style.box}>
                            <Image source={require('../images/leo.png')}></Image>
                            <Text style={style.text}>LEO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'virgo',imgSrc:require('../images/virgo.png')})} style={style.box}>
                            <Image source={require('../images/virgo.png')}></Image>
                            <Text style={style.text}>VIRGO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'libra',imgSrc:require('../images/libra.png')})} style={style.box}>
                            <Image source={require('../images/libra.png')}></Image>
                            <Text style={style.text}>LIBRA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'scorpio',imgSrc:require('../images/scorpio.png')})} style={style.box}>
                            <Image source={require('../images/scorpio.png')}></Image>
                            <Text style={style.text}>SCORPIO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'sagittarius',imgSrc:require('../images/sagittariu.png')})} style={style.box}>
                            <Image source={require('../images/sagittariu.png')}></Image>
                            <Text style={style.text}>SAGITTARIUS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'capricorn',imgSrc:require('../images/capricorn.png')})} style={style.box}>
                            <Image source={require('../images/capricorn.png')}></Image>
                            <Text style={style.text}>CAPRICORN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'aquarius',imgSrc:require('../images/aquarius.png')})} style={style.box}>
                            <Image source={require('../images/aquarius.png')}></Image>
                            <Text style={style.text}>AQUARIUS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'pisces', imgSrc:require('../images/pisces.png')})} style={style.box}>
                            <Image source={require('../images/pisces.png')}></Image>
                            <Text style={style.text}>PISCES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
        
    }     
}

const style = StyleSheet.create({
    align : {
        marginTop:'20%',
        position: 'absolute'
    },
    container : {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        height:80,
        margin:5,
        marginTop:'0.5%',
        width: (width/3-20),
        alignItems:'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius:5
    },
    backgroundImage: { 
        flex: 1, 
        width: null, 
        height: 550, 
        resizeMode: 'cover',
        alignItems:'center'        
    },
    text:{
        fontSize:10
    }
})