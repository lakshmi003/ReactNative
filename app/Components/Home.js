import React, {Component} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import Video from 'react-native-video'

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            url : "https://vjs.zencdn.net/v/oceans.mp4"
        }
    }
    
    /*static navigationOptions = {
        title: 'Home',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
        headerStyle:{
            backgroundColor:'white',
        }
    };*/    

    end(e) {
        debugger;
        console.log(this.state);
        this.setState({url : "https://s3.ap-south-1.amazonaws.com/arunprasad/Get+Hip+with+JHipster-+Spring+Boot+++AngularJS+++Bootstrap+by+Matt+Raible.mp4"});
    }

    render() {
        const navigate = this.props.navigation;
        console.log('Navigate ::', navigate);
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
                controls = {true}
                onEnd={this.end.bind(this)}           // Callback when playback finishes 
                onError={this.videoError}
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
      right: 0,
      backgroundColor : 'red'
    },
  });