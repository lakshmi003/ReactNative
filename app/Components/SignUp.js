import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Picker, Image, ScrollView, Alert, KeyboardAvoidingView} from 'react-native'
import DeviceInfo from 'react-native-device-info';

export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            country : '',
            mobileNo: '',
            code1:'',
            code2:'',
            code3:'',
            code4:'',
            showVerificationElements : false
        };
        this.deviceId = DeviceInfo.getUniqueID();
    }

    renderVerificationCodeElements() {
        if(this.state.showVerificationElements) {
            return(
                <View style={styles.rowPadded}>
                    <Text>OTP</Text>
                    <View style={styles.groupText}>
                        <TextInput onChangeText={(value) => this.setState({code1 : value})} keyboardType="numeric" style={{flex:1}}></TextInput>
                        <TextInput onChangeText={(value) => this.setState({code2 : value})} keyboardType="numeric" style={{flex:1}}></TextInput>
                        <TextInput onChangeText={(value) => this.setState({code3 : value})} keyboardType="numeric" style={{flex:1}}></TextInput>
                        <TextInput onChangeText={(value) => this.setState({code4 : value})} keyboardType="numeric" style={{flex:1}}></TextInput>
                    </View>
                    <View style={styles.rowPadded}>
                        <Button onPress={this.verifyOTP.bind(this)} title="VERIFY" style={styles.buttonColor} color='#ff4c00'></Button>
                    </View>
                </View>
            );
        } else {
            return null;
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
                code : this.state.code1 + this.state.code2 +this.state.code3 +this.state.code4 
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
                    <View style={styles.container}>
                        <View style={styles.rowPadded}>
                            <Text>Country</Text>
                            <Picker
                                selectedValue={this.state.country}
                                onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                                <Picker.Item label="India" value="india" />
                                <Picker.Item label="United States" value="us" />
                            </Picker>
                        </View>
                        <View style={styles.rowPadded}>
                            <Text>Phone</Text>
                            <TextInput value={this.state.mobileNo} onChangeText={(value)=> this.onChangeText(value)} keyboardType="numeric" onSubmitEditing={this.submit.bind(this)}></TextInput>
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
        console.log('this.deviceId :: ', this.deviceId);
        fetch("https://kba9cd3ow3.execute-api.us-east-1.amazonaws.com/tarpan_registration",{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MobileNo: this.state.mobileNo,
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
        padding : 3
    },
    groupText : {
        flexDirection: 'row',
        justifyContent: 'space-between',        
        padding : 3
    }
});