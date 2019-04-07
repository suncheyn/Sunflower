import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import { Font } from 'expo';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './home.js';
import CameraScreen from './camera.js';
import InfoScreen from './info.js';


const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Camera: {screen: CameraScreen},
  Info: {screen: InfoScreen}
});

const AppNavigator = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render(){
    return (
      <AppNavigator/>
    );
  }
}