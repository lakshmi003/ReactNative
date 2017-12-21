import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Picker, Image, ScrollView, Alert} from 'react-native'
import DeviceInfo from 'react-native-device-info';

export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            country : '',
            mobileNo: ''            
        }
        this.showVerificationElements = false;
    }

    /*renderVerificationCodeElements() {
        if(this.showVerificationElements) {
            return(
                <View>
                    <Text>
                        HI
                    </Text>
                </View>
            );
        } else {
            return null;
        }        
    }*/
    render() {
        return(
            <ScrollView>
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
                </View>
            </ScrollView>
        );
    }

    onChangeText(value) {
        console.log('value', value)
        this.setState({mobileNo : value})
    }

    submit() {
        console.log(DeviceInfo.getUniqueID());
        console.log(DeviceInfo.getDeviceId());
        fetch("https://kba9cd3ow3.execute-api.us-east-1.amazonaws.com/tarpan_registration",{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MobileNo: this.state.mobileNo,
                DeviceId: DeviceInfo.getUniqueID(),
            })
        }).then(
            response => response.json()
        ).then(
            result => {
                if(result.success){
                    Alert.alert(result.message);
                    this.showVerificationElements = true    
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
    container : {
        padding : 15       
    },    
    buttonColor: {
        backgroundColor:'#ff4c00'
    },
    rowPadded : {
        padding : 3
    }
});