import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const AuthStack = createStackNavigator();

const Welcome = ({navigation}) => (
  <View style={styles.container} >
    <TouchableOpacity onPress={() => navigation.navigate('登陆')}>
      <Text>登陆</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('注册')}>
      <Text>注册</Text>
    </TouchableOpacity>
  </View>
)


export const Auth = () => (

  <AuthStack.Navigator initialRouteName='欢迎'>
    <AuthStack.Screen component={Welcome} name='欢迎'></AuthStack.Screen>
    <AuthStack.Screen component={SignIn} name='登陆'></AuthStack.Screen>
    <AuthStack.Screen component={SignUp} name='注册'></AuthStack.Screen>

  </AuthStack.Navigator>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },

  
});