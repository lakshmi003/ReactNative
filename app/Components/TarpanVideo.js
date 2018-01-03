import React, {Component} from 'react'
import {Text, View, StyleSheet, Alert, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import Video from 'react-native-video'
import Spinner from 'react-native-loading-spinner-overlay'
import VideoPlayer from 'react-native-video-player';

export default class TarpanVideo extends Component {

    constructor() {
        super();
        this.state = {
            url : '',
            visible : false
        }
        this.urlList = [];
        this.urlSize = 0;
        this.currentUrlIndex = 0;
    }
    
    componentDidMount() {
        fetch('https://rzub7yd2r6.execute-api.us-east-1.amazonaws.com/tarpan_video_url',{
            method:'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(this.props.navigation.state.params)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.urlList = responseJson.payLoad; 
            this.urlSize = responseJson.payLoad.length;
            this.setState({url : this.urlList[this.currentUrlIndex].Link})
        })
        .catch((error) => {
            Alert.alert.error(error);
        });
    }

    end(e) {
        if(this.currentUrlIndex != this.urlList.length-1){
              this.currentUrlIndex += 1;
              this.setState({url : this.urlList[this.currentUrlIndex].Link});
        } else {
            this.currentUrlIndex = 0;
            this.setState({url : this.urlList[this.currentUrlIndex].Link});
        }
    }

    hidespinner() {
        this.setState({visible : false});
    }

    showSpinner() {
        this.setState({visible : true});   
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
                <VideoPlayer
                    video={{ uri: this.state.url }}
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}
                    defaultMuted={false}                // Mutes the audio entirely.
                    videoWidth={70}
                    videoHeight={40}
                    controlsTimeout={3000}
                    playInBackground= {true}
                    onEnd={this.end.bind(this)}           // Callback when playback finishes 
                    onError={this.videoError}
                    onLoad={this.hidespinner.bind(this)}
                    onLoadStart={this.showSpinner.bind(this)}
                    ignoreSilentSwitch={"ignore"}
                    loop={true}   // Callback when video loads
                />                
                <FlatList
                    data={this.urlList}
                    extraData={this.state}
                    renderItem={({item,index}) => this.renderFlatListItem(item,index)}                        
                />
            </ScrollView>            
        );
    }

    renderFlatListItem(item,index) {
        let itemBgColor = index==this.currentUrlIndex ? '#ff4c00' : '#DDDDDD';
        let textColor = index==this.currentUrlIndex ? 'white' : 'black';
        return (
            <TouchableOpacity onPress={() => this.changeVideoURL(index)}>
                <Text style={[styles.item, {backgroundColor:itemBgColor}, {color:textColor}]}>{item.Link} : {index}</Text>
            </TouchableOpacity>    
        );
    }

    changeVideoURL(index) {
        this.currentUrlIndex = index;
        this.setState({url:this.urlList[this.currentUrlIndex].Link})
    }
}
var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container :{
        padding:15        
    },
    item : {
        padding:20,
        borderBottomWidth:1,
        borderColor : 'white'
    }
  });