import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles';
import { createStackNavigator } from '@react-navigation/stack';

import {Welcome, SignUp, SignIn, CreateName} from './components/SignIn';

const AuthStack = createStackNavigator();



const AuthRoot = () => (

  <AuthStack.Navigator initialRouteName='欢迎' headerMode='none'>
    <AuthStack.Screen component={Welcome} name='欢迎'></AuthStack.Screen>
    <AuthStack.Screen component={SignIn} name='登陆'></AuthStack.Screen>
    <AuthStack.Screen component={SignUp} name='注册'></AuthStack.Screen>
    <AuthStack.Screen component={CreateName} name='名字'></AuthStack.Screen>


  </AuthStack.Navigator>
)

export default AuthRoot;