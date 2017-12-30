import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Video from 'react-native-video'

export default class TarpanVideo extends Component {

    constructor() {
        super();
        this.state = {
            url : ''
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
    /*static navigationOptions = {
        title: 'Home',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        }
    };*/    

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

    render() {
        return (
            /*<View>
                <Text>Home {navigate.state.params.name}</Text>
                <Text>{navigate.state.params.info.message}</Text>
                <Text>{navigate.state.params.info.mobileNo}</Text>
                <Text>{navigate.state.params.info.password}</Text>
                <Video
                source={{uri: "https://vjs.zencdn.net/v/oceans.mp4"}} // Can be a URL or a local file.
                rate={1.0}                   // 0 is paused, 1 is normal.
                volume={1.0}                 // 0 is muted, 1 is normal.
                muted={false}                // Mutes the audio entirely.
                paused={false}               // Pauses playback entirely.
                resizeMode="cover"           // Fill the whole screen at aspect ratio.
                repeat={true}
                controls = {true}               // Repeat forever.
                //playInBackground={false}     // Audio continues to play when aentering background.
                //playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
                //onLoadStart={this.loadStart} // Callback when video starts to load
                //onLoad={this.setDuration}    // Callback when video loads
                //onProgress={this.setTime}    // Callback every ~250ms with currentTime
                //onEnd={this.onEnd}           // Callback when playback finishes
                //onError={this.videoError}    // Callback when video cannot be loaded
                style={styles.backgroundVideo}
            />
            </View>*/
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
                //https://s3.amazonaws.com/tarpan-videos/amavasa.mp4
                //playInBackground={false}     // Audio continues to play when aentering background.
                //playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
                //onLoadStart={this.loadStart} // Callback when video starts to load
                //onLoad={this.setDuration}    // Callback when video loads
                //onProgress={this.setTime}    // Callback every ~250ms with currentTime
                //onEnd={this.onEnd}           // Callback when playback finishes
                //onError={this.videoError}    // Callback when video cannot be loaded
                style={styles.backgroundVideo}
            />
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