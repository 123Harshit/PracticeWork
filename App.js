import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { createSwitchNavigator } from "@react-navigation/compat"
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {firebaseConfig} from './config'
import * as firebase from 'firebase'
import * as Analytics from 'expo-firebase-analytics';
import PaymentScreen from './screens/PaymentScreen';

firebase.initializeApp(firebaseConfig)
export default class App extends React.Component {
  render(){
    return <AppNavigator/>
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen : LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen,
  PaymentScreen: PaymentScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
