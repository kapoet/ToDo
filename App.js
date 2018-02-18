import React, { Component } from 'react';
import Main from './app/components/Main';
import { StackNavigator } from 'react-navigation';
import Login from './app/components/Login'
import Register from './app/components/Register'
export default StackNavigator({
  login: { 
    screen: Login,
    navigationOptions: {
      header: null
    }},
  Home: { screen: Main },
  Register:{screen: Register}
});