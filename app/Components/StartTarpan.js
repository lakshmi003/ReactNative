import React, {Component} from 'react'
import {Text, View, Picker, TouchableOpacity, ScrollView, Switch, StyleSheet, Dimensions, Button, Alert} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';

var width = Dimensions.get('window').width;
let currentDate = new Date();
let currentDateString =  currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
export default class StartTarpan extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            country : '',
            suthram: '',
            caste:'',
            vedam:'',
            isMotherAlive:false
        }
        this.deviceId = this.props.navigation.state.params.deviceId;
        this.mobileNo = this.props.navigation.state.params.mobileNo;
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Basic Details',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'}
      })

    onPress() {
        fetch('https://j4xfrxok30.execute-api.us-east-1.amazonaws.com/tarpan_basic_details',{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MobileNo: this.mobileNo,
                DeviceId: this.deviceId,
                Info: {
                    Country:this.state.country,
                    Caste:this.state.caste,
                    Veaam:this.state.vedam,
                    Suthram:this.state.suthram,
                    IsYourMotherAlive:this.state.isMotherAlive
                }
            })
        }).then(
            response => response.json()
        ).then(
            result => {
                if(result.success){
                    let infoObj = { Country:this.state.country,
                        Caste:this.state.caste,
                        Veaam:this.state.vedam,
                        Suthram:this.state.suthram,
                        IsYourMotherAlive:this.state.isMotherAlive
                      }
                    let jsonObj  = {DeviceId : this.deviceId, MobileNo : this.mobileNo, CurrentDate : currentDateString, Info : infoObj}
                    this.props.navigation.navigate('VideoScreen',jsonObj)
                } else {
                    Alert.alert(result.message);                    
                }
            }
        );
    }
    
    getCountryOptions() {
        return [
            { value: 'India', label: 'India'},
            { value: 'United States', label: 'United States'}
        ];
    }

    getSuthramOptions() {
        if(this.state.vedam == "rig"){
            return [
                { value: 'Asvalayana Sutra', label: 'Asvalayana Sutra'},
                { value: 'Sankhayana Sutra', label: 'Sankhayana Sutra'},
                { value: 'Saunaka Sutra', label: 'Saunaka Sutra'}
            ];
        } else if(this.state.vedam == "yajur") {
            return [
                { value: 'Apastamba', label: 'Apastamba'},
                { value: 'Baudhayana', label: 'Baudhayana'},
                { value: 'Bharadvaja', label: 'Bharadvaja'},
                { value: 'Kaundinya', label: 'Kaundinya'},
                { value: 'Satyasadha', label: 'Satyasadha'}
            ];
        } else {
            return [
                { value: 'Drahyayana', label: 'Drahyayana'},
                { value: 'Latyayana', label: 'Latyayana'}
            ];
        }
    }

    onSubmitEditingCountry(value) {
        this.setState({country: value});
    }

    onSubmitEditingSuthram(value) {
        this.setState({suthram: value});
        console.log(this.state);
        console.log(value);
    }

    setSelectedvedam(value) {
        this.setState({
            vedam:value,
            suthram:''
        });
    }

    setSelectedCaste(value) {
        this.setState({caste:value});
    }

    setSwitchState(value) {
        this.setState({isMotherAlive:value})
    }

    renderVedam() {
        if(this.state.caste){
            let vedam = {
                rigBg : this.state.vedam == 'rig' ? '#ff4c00' : 'white',
                yajurBg : this.state.vedam == 'yajur' ? '#ff4c00' : 'white',
                samaBg : this.state.vedam == 'sama' ? '#ff4c00' : 'white',
                rigTc : this.state.vedam == 'rig' ? 'white' : 'black',
                yajurTc : this.state.vedam == 'yajur' ? 'white' : 'black',
                samaTc : this.state.vedam == 'sama' ? 'white' : 'black',
            }
            return(
                <View style={style.section}>
                    <Text style={{padding:3,fontWeight:'bold'}}>Vedam</Text>
                    <View style={style.menus}>
                        <TouchableOpacity onPress={() => this.setSelectedvedam('rig')}  style={[style.menuContent, {backgroundColor:vedam.rigBg, width: (width/2-100)}]}>
                            <Text style={{color:vedam.rigTc, textAlign:'center'}}>RIG</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setSelectedvedam('yajur')} style={[style.menuContent, {backgroundColor:vedam.yajurBg, width: (width/2-100)}]}>
                            <Text style={{color:vedam.yajurTc, textAlign:'center'}}>YAJUR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setSelectedvedam('sama')} style={[style.menuContent, {backgroundColor:vedam.samaBg, width: (width/2-100)}]}>
                            <Text style={{color:vedam.samaTc, textAlign:'center'}}>SAMA</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    renderSuthram() {
        if(this.state.vedam) {
            let dropdownPosition = this.state.vedam == 'sama' ? 1 : 2
            return(
                <View>
                    <View style={[style.section]}>
                        <View style={{paddingLeft:20, paddingRight: 20}}>
                            <Dropdown
                                dropdownPosition={dropdownPosition}
                                label='Suthram'
                                value={this.state.suthram}
                                data={this.getSuthramOptions()}
                                onChangeText={this.onSubmitEditingSuthram.bind(this)}
                            />
                        </View>
                    </View>                    
                </View>
            );
        } else {
            return null;
        }
    }
    
    render() {
        let caste = {
            iyerBg : this.state.caste == 'iyer' ? '#ff4c00' : 'white',
            iyengarBg : this.state.caste == 'iyengar' ? '#ff4c00' : 'white',
            tBrahminBg : this.state.caste == 'teluguBrahmin' ? '#ff4c00' : 'white',
            othersBg : this.state.caste == 'others' ? '#ff4c00' : 'white',
            iyerTc : this.state.caste == 'iyer' ? 'white' : 'black',
            iyengarTc : this.state.caste == 'iyengar' ? 'white' : 'black',
            tBrahminTc : this.state.caste == 'teluguBrahmin' ? 'white' : 'black',
            othersTc : this.state.caste == 'others' ? 'white' : 'black'
        }        
        return(
            <View style={[style.container]}>
                <ScrollView>
                    <View style={style.content}>
                        <View style={[style.section]}>
                            <View style={{paddingLeft:20, paddingRight: 20}}>
                                <Dropdown
                                    dropdownPosition={-3.1}
                                    label='Country'
                                    value={this.state.country}
                                    data={this.getCountryOptions()}
                                    onChangeText={this.onSubmitEditingCountry.bind(this)}
                                />
                            </View>
                        </View>
                        <View style={style.section}>
                            <Text style={{padding:5,fontWeight:'bold'}}>Caste</Text>
                            <View style={[style.menus, {flexWrap: 'wrap'}]}>
                                <TouchableOpacity onPress={() => this.setSelectedCaste('iyer')} style={[style.menuContent, {backgroundColor: caste.iyerBg, width: (width/2-70)}]}>
                                    <Text style={{color:caste.iyerTc, textAlign:'center'}}>IYER</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setSelectedCaste('iyengar')}  style={[style.menuContent, {backgroundColor: caste.iyengarBg, width: (width/2-70)}]}>
                                    <Text style={{color:caste.iyengarTc, textAlign:'center'}}> IYENGAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setSelectedCaste('teluguBrahmin')} style={[style.menuContent, {backgroundColor: caste.tBrahminBg, width: (width/2-70)}]}>
                                    <Text style={{color:caste.tBrahminTc, textAlign:'center'}}> TELUGU BRAHMIN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() =>this.setSelectedCaste('others')} style={[style.menuContent, {backgroundColor: caste.othersBg, width: (width/2-70)}]}>
                                    <Text style={{color:caste.othersTc, textAlign:'center'}}> OTHERS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.renderVedam()}
                        {this.renderSuthram()}
                    </View>
                </ScrollView>
                <View style={[style.switch]}>
                    <Text style={{left: 15,fontWeight:'bold'}}>IsYourMotherAlive</Text>
                    <Switch style={{left: 180}} onTintColor='#ff4c00' onValueChange={(value)=> this.setSwitchState(value)} value={this.state.isMotherAlive}></Switch>  
                </View>
                <View style={{margin:10}}>
                    <Button onPress={() => this.onPress()} title='NEXT' color='#ff4c00'></Button>
                </View>
            </View>
        ); 
    }
}

const style = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
      },
    content: {
        justifyContent: 'space-between',
    },
    section:{
        backgroundColor: 'white',
        margin:7,
        borderRadius: 10,
    },
    menus:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',  
    },
    menuContent:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#ff4c00',
        height: 50,
        margin:10,
    },
    switch: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    }
})