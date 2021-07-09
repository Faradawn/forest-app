import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Welcome, SignUp } from './components/SignIn';

const AuthStack = createStackNavigator();

const AuthRoot = () => (
  <AuthStack.Navigator initialRouteName='欢迎' headerMode='none'>
    <AuthStack.Screen component={Welcome} name='欢迎'></AuthStack.Screen>
    <AuthStack.Screen component={SignUp} name='注册'></AuthStack.Screen>
  </AuthStack.Navigator>
)

export default AuthRoot;