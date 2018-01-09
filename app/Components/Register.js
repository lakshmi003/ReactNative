import React, {Component} from 'react';
import {Text, TextInput, Button, Image, View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform} from 'react-native';

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
                <KeyboardAvoidingView behavior="position">
                    <View style={styles.align}>
                        <Image source={require('../images/photo.png')}></Image>
                    </View>
                    <View style={styles.rowPadded}>
                        <Text>Name</Text>
                        <TextInput onChangeText={(value) => this.onChangeText(value, 'name')} style={styles.textInput}
                        returnKeyType = {"next"} onSubmitEditing={(event) => { this.refs.email.focus(); }}></TextInput>
                    </View>
                    <View style={styles.rowPadded}>
                        <Text>Email</Text>
                        <TextInput ref="email" onChangeText={(value) => this.onChangeText(value, 'email')} style={styles.textInput}
                        returnKeyType = {"next"} onSubmitEditing={(event) => { this.refs.password.focus(); }}></TextInput>
                    </View>
                    <View style={styles.rowPadded}>
                        <Text>Password</Text>
                        <TextInput ref="password" onChangeText={(value) => this.onChangeText(value, 'password')} secureTextEntry={true} style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.rowPadded}>
                        <Button onPress={this.goToLoginScreen.bind(this)} title="LOGIN" style={styles.buttonColor} color='#ff4c00'></Button>
                    </View>
               </KeyboardAvoidingView>    
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
        padding : Platform.OS === 'ios' ? 15 : 3
    },
    textInput: {
        height : Platform.OS === 'ios' ? 45 : null,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : null,
        borderColor: 'gray'
    }
});