import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, TextInput, Image} from 'react-native';
import DeviceInfo from 'react-native-device-info'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : 'andriod',
            message: this.props.message,
            mobileNo: '',
            password: ''
        }
    }

    static navigationOptions = {
        title: 'Login',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        }
    };

    static defaultProps = {message:'Hi There'}

    render() {
        console.log('HELLO');
        return(
            <View>
                <Image source={require('../images/photo.png')}></Image>
                <Text>Mobile No.</Text>
                <TextInput value={this.state.mobileNo} keyboardType="numeric" onChangeText={(value) => this.onChangeText(value, 'mobileNo')}></TextInput>
                <Text>Password</Text>
                <TextInput value={this.state.password} onChangeText={(value) => this.onChangeText(value, 'password')}></TextInput>
                <Button onPress={this.deviceDetails.bind(this)} title="Test"></Button>
            </View>    
        );
    }

    deviceDetails() {
        console.log("Device Unique ID", DeviceInfo.getUniqueID());        
        console.log("this.state",this.state);
        this.props.navigation.navigate('VideoScreen',{name : 'world', info : this.state})
        
    }

    onChangeText(value,  fieldName) {
        this.setState({
            mobileNo: fieldName == 'mobileNo' ?  value : this.state.mobileNo,
            password: fieldName == 'password' ?  value : this.state.password
        });
    }
}

