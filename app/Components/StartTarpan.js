import React, {Component} from 'react'
import {Text, View, Picker, TouchableOpacity, ScrollView, Switch, StyleSheet, Dimensions, Button, Alert} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';

var width = Dimensions.get('window').width;
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
                    this.props.navigation.navigate('VideoScreen',{DeviceId : this.deviceId, MobileNo : this.mobileNo, Info: {Country: this.state.country, IsYourMotherAlive: this.state.isMotherAlive}})
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
        this.setState({vedam:value});
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
                <View>
                    <Text style={style.rowPadded}>Vedam</Text>
                    <View style={style.align}>
                        <View style={style.container}>
                            <TouchableOpacity onPress={() => this.setSelectedvedam('rig')} style={[style.box, style.vedamBox, {backgroundColor:vedam.rigBg}]}>
                                <Text style={{color:vedam.rigTc}}>RIG</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setSelectedvedam('yajur')} style={[style.box, style.vedamBox, {backgroundColor:vedam.yajurBg}]}>
                                <Text style={{color:vedam.yajurTc}}>YAJUR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setSelectedvedam('sama')} style={[style.box, style.vedamBox, {backgroundColor:vedam.samaBg}]}>
                                <Text style={{color:vedam.samaTc}}>SAMA</Text>
                            </TouchableOpacity>
                        </View>                    
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }

    renderSuthram() {
        if(this.state.vedam) {
            return(
                <View>
                    <View style={style.rowPadded}>
                        <Dropdown
                            dropdownPosition={2}
                            label='Suthram'
                            value={this.state.suthram}
                            data={this.getSuthramOptions()}
                            onChangeText={this.onSubmitEditingSuthram.bind(this)}
                        />
                    </View>
                    <View style={[style.switch, style.rowPadded]}>
                        <Text>IsYourMotherAlive</Text>
                        <Switch style={{paddingRight: 50}} onValueChange={(value)=> this.setSwitchState(value)} value={this.state.isMotherAlive}></Switch>
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
            <ScrollView>
                <Text style={{textAlign : 'center'}}>Basic Details</Text>
                <View style={style.rowPadded}>
                    <Dropdown
                        dropdownPosition={1}
                        label='Country'
                        value={this.state.country}
                        data={this.getCountryOptions()}
                        onChangeText={this.onSubmitEditingCountry.bind(this)}
                    />
                </View>
                <View>
                    <Text style={style.rowPadded}>Caste</Text>
                    <View style={style.align}>
                        <View style={[style.container]}>
                            <TouchableOpacity onPress={() => this.setSelectedCaste('iyer')} style={[style.box,{backgroundColor: caste.iyerBg}]}>
                                <Text style={{color:caste.iyerTc}}>IYER</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setSelectedCaste('iyengar')} style={[style.box,{backgroundColor: caste.iyengarBg}]}>
                                <Text style={{color:caste.iyengarTc}}>IYENGAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setSelectedCaste('teluguBrahmin')} style={[style.box,{backgroundColor: caste.tBrahminBg}]}>
                                <Text style={{color:caste.tBrahminTc}}>TELUGU BRAHMIN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>this.setSelectedCaste('others')} style={[style.box,{backgroundColor: caste.othersBg}]}>
                                <Text style={{color:caste.othersTc}}>OTHERS</Text>
                            </TouchableOpacity>
                        </View>                    
                    </View>
                </View>
                {this.renderVedam()}
                {this.renderSuthram()}
                <View style={style.rowPadded}>
                    <Button onPress={() => this.onPress()} title='NEXT' color='#ff4c00'></Button>
                </View>
            </ScrollView>    
        ); 
    }
}

const style = StyleSheet.create({
    align : {
        marginTop:'2%'
    },
    container : {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        height:70,
        margin:12,
        marginTop:'0.5%',
        width: (width/2-55),
        alignItems:'center',
        justifyContent: 'space-around'
    },
    vedamBox: {
        width: (width/3-25)
    },
    switch: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    rowPadded : {
        padding : 5
    }
})