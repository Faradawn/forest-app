import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text} from 'react-native';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const AuthStack = createStackNavigator();


export const Auth = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen component={SignUp} name='注册'></AuthStack.Screen>

  </AuthStack.Navigator>
)

