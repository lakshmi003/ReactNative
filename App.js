import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'
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
  render() {
    return(
      <AppNavigator />
    );
  }
}

const AppNavigator = StackNavigator({
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
})