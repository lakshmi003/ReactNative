import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Picker, Image, ScrollView, Alert, KeyboardAvoidingView, Platform, ActionSheetIOS} from 'react-native'
import DeviceInfo from 'react-native-device-info';
import { Dropdown } from 'react-native-material-dropdown';

export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            country : '',
            mobileNo: '',
            code:'',
            showVerificationElements : false
        };
        this.deviceId = DeviceInfo.getUniqueID();
    }

    getCountryOptions() {
        return [
            { value: 'India', label: 'India'},
            { value: 'United States', label: 'United States'}
        ];
    }

    onSubmitEditingCountry(value) {
        this.setState({country: value});
    }
    //let countryOption = ['India','United States','Cancel'];
    renderVerificationCodeElements() {
        if(this.state.showVerificationElements) {
            return(
                <View style={styles.rowPadded}>
                    <Text>OTP</Text>
                    <View>
                        <TextInput onChangeText={(value) => this.setState({code : value})} keyboardType="numeric" style={styles.textInput}></TextInput>
                    </View>
                    <View style={styles.rowPadded}>
                        <Button onPress={this.verifyOTP.bind(this)} title="VERIFY" style={styles.buttonColor} color='#ff4c00'></Button>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.rowPadded}>
                    <Button onPress={this.submit.bind(this)} title="SendOTP" style={styles.buttonColor} color='#ff4c00'></Button>
                </View>
            );
        }        
    }

    verifyOTP() {
        fetch("https://18i2sf2855.execute-api.us-east-1.amazonaws.com/tarpan_verification",{
            method : 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MobileNo: this.state.mobileNo,
                DeviceId: this.deviceId,
                code : this.state.code
            })
        }).then(
            response => response.json()
        ).then(
            result => {
                if(result.success){
                    Alert.alert(result.message);
                    this.props.navigation.navigate('RegisterScreen',{deviceId : this.deviceId, mobileNo : this.state.mobileNo})
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
                    <View>
                        <View style={styles.rowPadded}>
                            <Dropdown
                                dropdownPosition={1}
                                label='Country'
                                value={this.state.country}
                                data={this.getCountryOptions()}
                                onChangeText={this.onSubmitEditingCountry.bind(this)}
                            />
                        </View>
                        <View style={styles.rowPadded}>
                            <Text>Phone</Text>
                            <TextInput style={styles.textInput} value={this.state.mobileNo} onChangeText={(value)=> this.onChangeText(value)} keyboardType="numeric"></TextInput>
                        </View>
                        {this.renderVerificationCodeElements()}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }

    onChangeText(value) {
        this.setState({mobileNo : value})
    }

    submit() {
        let mobileNo;
        let countryCode;
        if(this.state.country=='India'){
            mobileNo = '91' + this.state.mobileNo
        } else if(this.state.country=='United States') {
            mobileNo = '1' + this.state.mobileNo;
        }
        console.log('this.deviceId :: ', mobileNo);
        fetch("https://kba9cd3ow3.execute-api.us-east-1.amazonaws.com/tarpan_registration",{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MobileNo: mobileNo,
                DeviceId: this.deviceId,
            })
        }).then(
            response => response.json()
        ).then(
            result => {
                if(result.success){
                    Alert.alert(result.message);
                    this.setState({showVerificationElements : true});
                } else {
                    Alert.alert(result.message);
                    this.setState({showVerificationElements : false});
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
        padding : Platform.OS === 'ios' ? 6 : 3
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