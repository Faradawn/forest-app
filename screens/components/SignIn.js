import React from 'react'
import { View, TextInput, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/store';
import AsyncStorage from '@react-native-community/async-storage';

// 第一页面：Welcome
export const Welcome = ({navigation}) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity>
        <ImageBackground
          source={require('../../assets/images/welcome-flower.jpg')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}
        />
      </TouchableOpacity>

      <Text 
        style={{fontSize: 20, letterSpacing: 2, marginBottom: 20}}>
          拉丁园，终于等到你!
      </Text>

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => navigation.navigate('注册')}>
        <Text style={styles.signUpText} >打开大门</Text>
      </TouchableOpacity>

    </View>
  )
}

// 第二页面：注册新用户
export const SignUp = ({navigation}) => {
  const [username, SetUsername] = React.useState('');

  const dispatch = useDispatch();
  
  async function handleSignUp(){
    dispatch(setUser('guest-token', username ? username : '朋友'));
    await AsyncStorage.setItem('guest-token', username ? username : '朋友');
    console.log('完成注册：', 'guest-token', username ? username : '朋友');
  }

  return(
    <View style={styles.signupContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={()=>navigation.navigate('欢迎')}>
          <Ionicons name='arrow-back' size={20} color='grey'/>
      </TouchableOpacity>

      <Text style={styles.headerText}>要不要，{'\n'}起个喜欢的昵称？</Text>
      <View style={{height: 30}}></View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='随便一个昵称'
          style={styles.input}
          onChangeText={SetUsername}
          value={username}
        />
      </View>

      {/* one line flex */}
      <View style={styles.secondLine}>
        <Text style={styles.headerText}>登入</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Ionicons name= 'arrow-forward-circle' size={60} color="tomato" />
        </TouchableOpacity>
      </View>
      <View style={{height: 40}}></View>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.smallText} >等不及了？直接进入！</Text>
      </TouchableOpacity>
    </View>
  )
} 




const styles = StyleSheet.create({

  // containers
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop,
  },
  signupContainer: {
    alignItems: 'flex-start',
    paddingLeft: 50,
    paddingTop: theme.marginTop+20,
  },

  backButton:{
    top: -10,
  },

  // 第一页：欢迎
  imageCard: {
    marginBottom: 30,
    height: theme.height,
    borderRadius: theme.border,
    width: theme.authWidth+30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  // 上方实心按钮 
  signupButton: {
    backgroundColor: 'tomato',
    width: theme.authWidth,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  signUpText: {
    fontSize: 15,
    letterSpacing: 50,
    color: 'white',
  },

    bottomText: {
      color: 'grey',
      fontSize: 13,
      letterSpacing: 5,
      margin: 10,
    },



  // 第二页：输入框子
  input: {
    height: 40,
    width: theme.authWidth-30,
  },

  inputContainer: {
    height: 40,
    width: theme.authWidth-40,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 30,
    letterSpacing: 4,
    lineHeight: 45,
  },

  smallText: {
    color: 'black',
  },

  secondLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: theme.authWidth-30,
  }
})