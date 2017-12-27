import React, {Component} from 'react';
import {ScrollView, Text, View, Button, TextInput, Image, KeyboardAvoidingView, StyleSheet, Alert, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mobileNo: '',
            password: ''
        }
        this.deviceId = DeviceInfo.getUniqueID();
    }

    static navigationOptions = {
        title: 'Login',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        }
    };

    render() {
        return(
            <ScrollView>
                <KeyboardAvoidingView behavior="position">   
                    <View style={styles.align}>
                        <Image source={require('../images/photo.png')}></Image>
                    </View>    
                    <View>
                        <View style={styles.rowPadded}>
                            <Text>Phone</Text>
                            <TextInput value={this.state.mobileNo} onChangeText={(value)=> this.onChangeText('mobileNo',value)} keyboardType="numeric" style={styles.textInput}></TextInput>
                        </View>
                    </View>
                    <View>
                        <View style={styles.rowPadded}>
                            <Text>Password</Text>
                            <TextInput value={this.state.password} onChangeText={(value)=> this.onChangeText('password',value)} style={styles.textInput}></TextInput>
                        </View>
                    </View>
                    <View style={styles.rowPadded}>
                        <Button onPress={() => this.login()} title="LOGIN" style={styles.buttonColor} color='#ff4c00'></Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>    
        );
    }

    onChangeText(fieldName, value) {
        this.setState({
            mobileNo: fieldName == 'mobileNo' ?  value : this.state.mobileNo,
            password: fieldName == 'password' ?  value : this.state.password
        });
    }

    login() {
        fetch('https://jyo7uw3v6f.execute-api.us-east-1.amazonaws.com/tarpan_login',{
            method : 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify ({
                DeviceId : this.deviceId,
                MobileNo : this.state.mobileNo,
                Password: this.state.password                
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
    },
    groupText : {
        flexDirection: 'row',
        justifyContent: 'space-between',        
        padding : 3
    },
    textInput: {
        height : Platform.OS === 'ios' ? 45 : null,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : null,
        borderColor: 'gray'
    }
});