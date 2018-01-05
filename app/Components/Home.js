import React, {Component} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Dimensions, Button, Text} from 'react-native';

var width = Dimensions.get('window').width;

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.deviceId = this.props.navigation.state.params.deviceId;
        this.mobileNo = this.props.navigation.state.params.mobileNo;
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Home',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerRight: <View style={{alignItems : 'flex-end'}}>
                        <Image source={require('../images/settings.png')}></Image>
                    </View>
      })
    
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../images/Tarpan_home.png')} style={styles.backgroundImage}></Image>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('StartTarpanScreen',{deviceId:this.deviceId, mobileNo:this.mobileNo})} style={styles.box}>
                        <Image source={require('../images/starttarpan.png')}></Image>
                        <Text style={styles.text}>&nbsp;&nbsp;START{"\n"}TARPAN</Text>
                        <Text style={styles.subText}>20 MINS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={require('../images/guidedtour.png')}></Image>
                        <Text style={styles.text}>GUIDED{"\n"}&nbsp;TOUR</Text>
                        <Text style={styles.subText}>2 MINS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HoroscopeScreen',{deviceId:this.deviceId, mobileNo:this.mobileNo})} style={styles.box}>
                        <Image source={require('../images/horoscope.png')}></Image>
                        <Text style={styles.text}>HOROSCOPE</Text>
                        <Text style={styles.subText}>5 ITEMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.box}>
                        <Image source={require('../images/video.png')}></Image>
                        <Text style={styles.text}>VIDEOS</Text>
                        <Text style={styles.subText}>5 VIDEOS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }        

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#ecf0f1',
    },
    backgroundImage: {
        flexGrow:1,
        height:null,
        width:null,
        alignItems: 'center',
    },
    content: {
        marginTop:'15%',
        position: 'absolute',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
    },
    box: {
        height:150,
        margin:8,
        width: (width/2-50),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20
    },
    text: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent:'center',
        paddingBottom: 10,
    },
    subText: {
        fontSize: 10
    }
})
