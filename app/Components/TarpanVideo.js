import React, {Component} from 'react'
import {Text, View, StyleSheet, Alert, ScrollView, FlatList, TouchableOpacity} from 'react-native'
import Video from 'react-native-video'
import Spinner from 'react-native-loading-spinner-overlay'
import VideoPlayer from 'react-native-video-player'
import RNFetchBlob from 'react-native-fetch-blob'

export default class TarpanVideo extends Component {

    constructor() {
        super();
        this.state = {
            url : '',
            visible : false,
            isdownloaded:false,
            mantramName : ''
        }
        this.urlList = [];
        this.currentUrlIndex = 0;
        this.filePath = '';
        this.pathIndex=0;
    }
    
    componentDidMount() {
        this.mounted=true;
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
            this.downloadFileFromUrlToPath();
            //this.setState({url : this.urlList[this.currentUrlIndex].Link})
        })
        .catch((error) => {
            Alert.alert.error(error);
        });
    }

    componentWillUnmount() {
        this.mounted = false;
        RNFetchBlob.fs.unlink('res.path()')
        .then(() => {console.log('Erased')})
        .catch((err) => {console.log('not erased')})
      }

    downloadFileFromUrlToPath() {
        let urlIndex = this.currentUrlIndex != this.urlList.length-1 && this.state.isdownloaded ? this.currentUrlIndex+1 : 0
        RNFetchBlob
        .config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache : true,
            appendExt : 'mp4'
        })
        .fetch('GET', this.urlList[urlIndex].Link, {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            if(this.mounted) {
                console.log('The file saved to ', res.path())
                this.filePath = res.path();
                this.pathIndex = urlIndex;
                if(this.state.isdownloaded== false){
                    this.setState({
                        mantramName:'Mantram 1',
                        isdownloaded : true,
                        url:res.path()
                    });
                }
            }            
        })
    }

    end(e) {
        RNFetchBlob.fs.unlink(this.state.url)
        .then(() => {console.log('Erased')})
        .catch((err) => {console.log('not erased')})
        if(this.currentUrlIndex != this.urlList.length-1){
            this.currentUrlIndex += 1;  
            let path = this.pathIndex == this.currentUrlIndex ? this.filePath : this.urlList[this.currentUrlIndex].Link;
            this.setState({
                url : path,
                mantramName:'Manthram '+(this.currentUrlIndex+1)
            });
        } else {
            this.currentUrlIndex = 0;
            let path = this.pathIndex == this.currentUrlIndex ? this.filePath : this.urlList[this.currentUrlIndex].Link;
            this.setState({
                url : path,
                mantramName:'Manthram '+(this.currentUrlIndex+1)
            });
        }
        console.log('URL :: ',this.urlList[this.currentUrlIndex].Link)
    }

    hidespinner() {
        this.setState({visible : false});
    }

    showSpinner() {
        this.downloadFileFromUrlToPath();
        this.setState({visible : true});   
    }
    
    renderVideoPlayer() {
        if(this.state.isdownloaded) {
            return(
                <View>
                    <Text style={{alignSelf:'center', color:'#ff4c00'}}>{this.state.mantramName}</Text>
                    <VideoPlayer
                        video={{ uri: this.state.url }}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        videoWidth={70}
                        videoHeight={40}
                        controlsTimeout={3000}
                        playInBackground= {true}
                        onEnd={this.end.bind(this)}
                        onError={this.videoError}
                        onLoad={this.hidespinner.bind(this)}
                        onLoadStart={this.showSpinner.bind(this)}
                        ignoreSilentSwitch={"ignore"}
                        loop={true}
                    />
                    <ScrollView style={{height:350}}>
                        <FlatList
                            data={this.urlList}
                            extraData={this.state}
                            renderItem={({item,index}) => this.renderFlatListItem(item,index)}                        
                        />
                    </ScrollView>
                </View>    
            );
        } else {
            return (
                <View style={styles.textcontainer}>
                    <Text style={{alignSelf:'center'}}>Please wait..</Text>
                </View>    
            );
        }
    }

    render() {
        return (
            <View>
                <View>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
                {this.renderVideoPlayer()}                
            </View>            
        );
    }

    renderFlatListItem(item,index) {
        let itemBgColor = index==this.currentUrlIndex ? '#ff4c00' : '#DDDDDD';
        let textColor = index==this.currentUrlIndex ? 'white' : 'black';
        return (
            <TouchableOpacity onPress={() => this.changeVideoURL(index)}>
                <Text style={[styles.item, {backgroundColor:itemBgColor}, {color:textColor}]}>Manthram {index+1}</Text>
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
    },
    textcontainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        //flex:1,
    }
  });