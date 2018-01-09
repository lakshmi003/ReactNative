import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
import {AsyncStorage, View} from 'react-native'
import Main from './app/Components/Main'
import Login from './app/Components/Login'
import SignUp from './app/Components/SignUp';
import Register from './app/Components/Register';
import TarpanVideo from './app/Components/TarpanVideo'
import Home from './app/Components/Home';
import Horoscope from './app/Components/Horoscope';
import HoroscopeResult from './app/Components/HoroscopeResult';
import StartTarpan from './app/Components/StartTarpan';
import VideoList from './app/Components/VideoList';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      routename : ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('tarpanInfo').then((value) => {
      console.log('value :: ', value);
      this.setState({
        routename : value != null ? 'HomeScreen' : 'MainScreen'
      })
    })
  }

  render() {
    if(this.state.routename == 'HomeScreen') {
      return(
        <HomeNavigator />
      );
    } else if(this.state.routename == 'MainScreen') {
      return(
        <AppNavigator />
      );
    }
    else {
      return null;
    }
  }
}
let tarpanScreens = {
  MainScreen: {screen: Main},
  SignUpScreen: {screen: SignUp},
  LoginScreen: {screen: Login},
  RegisterScreen: { screen: Register},
  VideoScreen: { screen: TarpanVideo},
  HomeScreen: { screen: Home},
  HoroscopeScreen: {screen: Horoscope},
  HoroscopeResultScreen: {screen: HoroscopeResult},
  StartTarpanScreen : {screen: StartTarpan},
  VideoListScreen: {screen: VideoList}
}
const HomeNavigator = StackNavigator(
  tarpanScreens,
  {
    initialRouteName:'HomeScreen'
  }
)

const AppNavigator = StackNavigator(
  tarpanScreens,
  {
    initialRouteName:'MainScreen'
  }
)