import React, {Component} from 'react';
import {Text,Image, Button, View, StyleSheet} from 'react-native';

export default class Main extends Component {
    
    constructor() {
        super();
        this.goToScreen = this.goToScreen.bind(this)
    }

    static navigationOptions = {
        title: 'Tarpan Application',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color:'white'},
        headerStyle:{
            backgroundColor:'#ff4c00',
        }
    };

    render() {
        return(
            <View style={styles.align}>
                <Image source={require('../images/photo.png')}></Image>
                <View style={styles.buttonGroup}>
                    <Button onPress={() => this.goToScreen('signIn')} title="SIGN IN" style={styles.buttonColor} color="#ff4c00"></Button>
                    <Button onPress={() => this.goToScreen('signUp')} title="SIGN UP" style={styles.buttonColor} color="#ff4c00"></Button>                
                </View>
            </View>
        );
    }

    goToScreen(screen) {
        if(screen == 'signIn') {
            this.props.navigation.navigate('HomeScreen',{name : 'world', info : this.state})
        } else {
            this.props.navigation.navigate('SignUpScreen',{name : 'world', info : this.state})
        }
    }
}

const styles = StyleSheet.create({
    align : {
        justifyContent: 'center',
        alignItems: 'center',
        padding : 15
    },
    buttonGroup : {
        flexDirection: 'row',
        justifyContent: 'space-between',        
        width: '65%',
        paddingTop : 90        
    },    
    buttonColor: {
        backgroundColor:'#ff4c00'
    }
});