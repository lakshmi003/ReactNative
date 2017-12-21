import React, {Component} from 'react';
import {Text, TextInput, Button, Image, View, StyleSheet, ScrollView, Alert} from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''            
        }
        this.deviceId = this.props.navigation.state.params.deviceId;
        this.mobileNo = this.props.navigation.state.params.mobileNo;
    }

    onChangeText(value, inputName) {
        this.setState({
            name : inputName == 'name' ? value : this.state.name,
            email : inputName == 'email' ? value : this.state.email,
            password : inputName == 'password' ? value : this.state.password
        });
    }

    goToLoginScreen() {
        fetch("https://1pmuu8kbc3.execute-api.us-east-1.amazonaws.com/tarpan_basic_info",{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify ({
                DeviceId : this.deviceId,
                MobileNo : this.mobileNo,
                Info : {
                    UserName: this.state.name,
                    EmailId: this.state.email,
                    Password: this.state.password
                }
            })
        }).then(
            response => response.json()
        ).then(
            result => {
                if(result.success){
                    Alert.alert(result.message);
                    this.props.navigation.navigate('HomeScreen',{deviceId:this.deviceId, mobileNo:this.mobileNo})
                } else {
                    Alert.alert(result.message);
                }
            }
        )
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.align}>
                    <Image source={require('../images/photo.png')}></Image>
                </View>
                <View style={styles.rowPadded}>
                    <Text>Name</Text>
                    <TextInput onChangeText={(value) => this.onChangeText(value, 'name')}></TextInput>
                </View>
                <View style={styles.rowPadded}>
                    <Text>Email</Text>
                    <TextInput onChangeText={(value) => this.onChangeText(value, 'email')}></TextInput>
                </View>
                <View style={styles.rowPadded}>
                    <Text>Password</Text>
                    <TextInput onChangeText={(value) => this.onChangeText(value, 'password')} secureTextEntry={true}></TextInput>
                </View>
                <View style={styles.rowPadded}>
                    <Button onPress={this.goToLoginScreen.bind(this)} title="LOGIN" style={styles.buttonColor} color='#ff4c00'></Button>
                </View>
            </ScrollView>            
        );
    }
}

const styles = StyleSheet.create({
    align : {
        justifyContent: 'center',
        alignItems: 'center',
        padding : 15        
    },    
    buttonColor: {
        backgroundColor:'#ff4c00'
    },
    rowPadded : {
        padding : 3
    }
});