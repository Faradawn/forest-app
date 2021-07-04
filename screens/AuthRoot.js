import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles';
import { createStackNavigator } from '@react-navigation/stack';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const AuthStack = createStackNavigator();

const Welcome = ({navigation}) => (
  <View style={styles.container} >

    <TouchableOpacity>
      <ImageBackground
        source={require('../assets/images/welcome-flower.jpg')}
        imageStyle={{borderRadius: theme.border}}
        style={styles.imageCard}/>
    </TouchableOpacity>

    <Text>欢迎来到拉丁园</Text>

    <TouchableOpacity 
      style={styles.signupButton}
      onPress={() => navigation.navigate('注册')}>
      <Text style={styles.signUpText} 
      > 注册</Text>
    </TouchableOpacity>

    <TouchableOpacity 
      style={styles.loginButton}
      onPress={() => navigation.navigate('登陆')}>
      <Text style={styles.loginText} 
      > 登陆</Text>
    </TouchableOpacity>

    

      <Text style={styles.bottomText} 
      > 稍后再说</Text>
  </View>
)


const AuthRoot = () => (

  <AuthStack.Navigator initialRouteName='欢迎' headerMode='none'>
    <AuthStack.Screen component={Welcome} name='欢迎'></AuthStack.Screen>
    <AuthStack.Screen component={SignIn} name='登陆'></AuthStack.Screen>
    <AuthStack.Screen component={SignUp} name='注册'></AuthStack.Screen>

  </AuthStack.Navigator>
)

export default AuthRoot;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: theme.marginTop,

  },
  imageCard: {
    marginBottom: 30,
    height: theme.height,
    borderRadius: theme.border,
    width: theme.width,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  // 上面注册 
  signupButton: {
    backgroundColor: 'tomato',
    width: theme.width-30,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },

  // 下面登陆
  loginButton: {
    backgroundColor: 'white',
    width: theme.width-30,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

  },

  // 上面注册
  signUpText: {
    fontSize: 15,
    letterSpacing: 50,
    color: 'white',
  },
  // 下面登陆
  loginText: {
    fontSize: 14,
    letterSpacing: 50,
    borderColor: 'black',
  },
  
  bottomText: {
    color: 'grey',
    fontSize: 13,
    letterSpacing: 5,
    margin: 10,
  }
  
});
