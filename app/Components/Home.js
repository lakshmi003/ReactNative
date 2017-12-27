import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default class Home extends Component {
    
    goToScreen(name) {
        switch(name) {
            case "video":
                this.props.navigation.navigate('VideoScreen');
                break;
            case "horoscope":
                this.props.navigation.navigate('horoscopeScreen');
                break;    
        }
    }

    render() {
        return (
            <View>
                <View style={{alignItems : 'flex-end'}}>
                    <Image source={require('../images/settings.png')}></Image>
                </View>
                <View style={style.align}>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.goToScreen('video')} style={style.imgBackground}>
                            <Image source={require('../images/starttarpan.png')} style={{flex:1}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goToScreen('video')} style={style.imgBackground}>
                            <Image source={require('../images/guidedtour.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={style.container}>
                        <TouchableOpacity onPress={() => this.goToScreen('horoscope')} style={style.imgBackground}>
                            <Image source={require('../images/horoscope.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goToScreen('video')} style={style.imgBackground}>
                            <Image source={require('../images/video.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>
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
        paddingTop : 45,
    },
    container : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '55%',
        paddingTop : 50        
    }

})
