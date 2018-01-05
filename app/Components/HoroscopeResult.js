import React, {Component} from 'react';
import {Text, Alert, StyleSheet, View, Image, ScrollView} from 'react-native';
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
    headerTitleStyle :{textAlign: 'center',alignSelf:'center'}
  })    

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
                visible: false,
                date: responseJson.date
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
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.textContainer}>
                        <Image  source={this.props.navigation.state.params.imgSrc}></Image>
                        <View>
                            <Text style={styles.textright}>{this.state.date}</Text>
                            <Text style={styles.textright}>by Pankaj khanna</Text>
                        </View>
                    </View>    
                    <View style={{ flex: 1 }}>
                        <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                    </View>
                    <View>
                        <Text style={styles.text}>{this.state.description}</Text>
                    </View>
                    {/*<View style={styles.group}>
                        <Text style={styles.text}>Intensity: {this.state.intensity}</Text>
                        <Text style={styles.text}>Keywords: {this.state.keywords}</Text>
                        <Text style={styles.text}>Mood: {this.state.mood}</Text>
                    </View>*/}
                </ScrollView>
                <View style={{padding:20}}>
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
        lineHeight: 25,
        padding:15,
        fontSize:15
    },
    group: {
        alignItems : 'flex-end',
        paddingTop : 70
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    textright: {    
        alignSelf: 'flex-start',
        paddingLeft:60,
        lineHeight:25
    },    
    textContainer: {
        flex:2,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        padding: 30
    }
})