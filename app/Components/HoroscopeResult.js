import React, {Component} from 'react';
import {Text, Alert, StyleSheet, View, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'

export default class HoroscopeResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            intensity: '',
            keywords: '',
            mood: '',
            visible: true
        }
        this.name = this.props.navigation.state.params.name;
    }

   static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.name.toUpperCase()}`,
  })

    /*static navigationOptions = {
        header: (props) => ({
            title: this.name,
            headerTitleStyle :{textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            }
        })
    }*/

    componentWillMount() {
        fetch('http://sandipbgt.com/theastrologer/api/horoscope/'+this.name+'/today/')
        .then((response) => response.json())
        .then((responseJson) => {
            let index = responseJson.horoscope.lastIndexOf('(c)');
            this.setState({
                description : (responseJson.horoscope).slice(0,index),
                intensity : responseJson.meta.intensity,
                keywords : responseJson.meta.keywords,
                mood : responseJson.meta.mood,
                visible: false
            })            
        })
        .catch((error) => {
            this.setState({
                visible: false
            })
            Alert.alert(error.message)
        });
    }

    render() {
        return (
            <View>
                <Image source={this.props.navigation.state.params.imgSrc}></Image>
                <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                </View>
                <View>
                    <Text style={styles.text}>{this.state.description}</Text>
                </View>
                <View style={styles.group}>
                    <Text style={styles.text}>Intensity: {this.state.intensity}</Text>
                    <Text style={styles.text}>Keywords: {this.state.keywords}</Text>
                    <Text style={styles.text}>Mood: {this.state.mood}</Text>
                </View>
                <View style={{justifyContent: 'space-between', paddingTop:100, flexDirection: 'column'}}>
                    <Text style={{fontSize:12, textAlign:'center'}}>
                        (c) Kelli Fox, The Astrologer, http://new.theastrologer.com
                    </Text>
                </View>
            </View>    
        );
    }
}
const styles = StyleSheet.create({
    text: {        
        textAlign: 'justify',
        //lineHeight: 15,
        padding:15,
        fontSize:15
    },
    group: {
        alignItems : 'flex-end',
        paddingTop : 70
    }
})