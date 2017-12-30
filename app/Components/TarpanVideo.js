import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Video from 'react-native-video'
import Spinner from 'react-native-loading-spinner-overlay'

export default class TarpanVideo extends Component {

    constructor() {
        super();
        this.state = {
            url : '',
            visible : true
        }
        this.urlList = [];
        this.urlSize = 0;
        this.currentUrlIndex = 0;
    }
    
    componentWillMount() {
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
            console.log('urlsList :: ', this.urlList);
            console.log('currentUrlIndex :: ', this.currentUrlIndex);
        })
        .catch((error) => {
            Alert.alert.error(error);
        });
    }

    end(e) {
        if(this.currentUrlIndex != this.urlList.length-1){
              this.currentUrlIndex += 1;
              this.setState({url : this.urlList[this.currentUrlIndex].Link});
              console.log('stateOnIF :: ', this.state);
        } else {
            this.currentUrlIndex = 0;
            this.setState({url : this.urlList[this.currentUrlIndex].Link});
            console.log('stateOnElse :: ', this.state);
        }
        console.log('currentUrlIndex :: ', this.currentUrlIndex);
    }

    hidespinner() {
        this.setState({visible : false});
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <Video
                    source={{uri: this.state.url}} // Can be a URL or a local file.
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={false}               // Pauses playback entirely.
                    resizeMode="stretch"           // Fill the whole screen at aspect ratio.
                    repeat={false}
                    setControls={true}
                    controls = {true}
                    onEnd={this.end.bind(this)}           // Callback when playback finishes 
                    onError={this.videoError}
                    onLoad={this.hidespinner.bind(this)}    // Callback when video loads
                    style={styles.backgroundVideo}
                />
            </View>            
        );
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
  });