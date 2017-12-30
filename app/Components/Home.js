import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Dimensions, Button} from 'react-native';

var width = Dimensions.get('window').width;

export default class Home extends Component {

    static navigationOptions = {
        headerRight: <View style={{alignItems : 'flex-end'}}>
                        <Image source={require('../images/settings.png')}></Image>
                    </View>
    };
    
    constructor(props) {
        super(props)
        this.deviceId = this.props.navigation.state.params.deviceId;
        this.mobileNo = this.props.navigation.state.params.mobileNo;
    }
    
    render() {
        return (
            <View>
                <View style={style.align}>
                    <View style={[style.container,style.col]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('StartTarpanScreen',{deviceId:this.deviceId, mobileNo:this.mobileNo})} style={style.box}>
                            <Image source={require('../images/starttarpan.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.box}>
                            <Image source={require('../images/guidedtour.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeScreen',{deviceId:this.deviceId, mobileNo:this.mobileNo})} style={style.box}>
                            <Image source={require('../images/horoscope.png')}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>this.props.navigation.navigate('VideoScreen',{deviceId:this.deviceId, mobileNo:this.mobileNo})} style={style.box}>
                            <Image source={require('../images/video.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>    
            </View>
        );
    }

}

const style = StyleSheet.create({
    align : {
        marginTop:'35%'
    },
    container : {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        height:90,
        margin:8,
        width: (width/2-50),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD'
    }
})
