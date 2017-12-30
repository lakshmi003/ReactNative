import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class Horoscope extends Component {
    render() {
        return(
            <ScrollView>
                <View style={style.align}>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'aries'})} style={style.imgBackground}>
                            <Image source={require('../images/aries.png')} style={{flex:1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'taurus'})} style={style.imgBackground}>
                            <Image source={require('../images/taurus.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'gemini'})} style={style.imgBackground}>
                            <Image source={require('../images/gemini.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'cancer'})} style={style.imgBackground}>
                            <Image source={require('../images/cancer.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'leo'})} style={style.imgBackground}>
                            <Image source={require('../images/leo.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'virgo'})} style={style.imgBackground}>
                            <Image source={require('../images/virgo.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'libra'})} style={style.imgBackground}>
                            <Image source={require('../images/libra.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'scorpio'})} style={style.imgBackground}>
                            <Image source={require('../images/scorpio.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'sagittarius'})} style={style.imgBackground}>
                            <Image source={require('../images/sagittariu.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'capricorn'})} style={style.imgBackground}>
                            <Image source={require('../images/capricorn.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'aquarius'})} style={style.imgBackground}>
                            <Image source={require('../images/aquarius.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeResultScreen',{name:'pisces'})} style={style.imgBackground}>
                            <Image source={require('../images/pisces.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>    
            </ScrollView>
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