import React from 'react'
import { View, TextInput, Text, StyleSheet, Button, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';

import AV from 'leancloud-storage/core';
import { AuthContext } from '../api/context';
import { ThemeProvider } from '@react-navigation/native';


// 第一页面：Welcome
export const Welcome = ({navigation}) => (
  <View style={styles.container} >

    <TouchableOpacity>
      <ImageBackground
        source={require('../../assets/images/welcome-flower.jpg')}
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
    >等不及了，让我进去</Text>
  </View>
)

// 第二页面：注册新用户
export const SignUp = () => {
  const [username, SetUsername] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, SetPassword] = React.useState('');
  
  function handleSignUp(){
    if(username && phone && password){
      const user = new AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.setMobilePhoneNumber(`+86${phone}`);
  
      user.signUp().then((user) => {
        console.log('注册成功',user);
        setPhone(user.phone);
        
      })
      .catch((error) => console.log(error));
    } else {
      alert('有没有漏填的项～')
    }

  }

  function checkCurrent(){
    const current = AV.User.currentAsync();
    if(current){

      console.log(current);
    }
  }

  return(
    <View style={styles.signupContainer}>

      <Text style={styles.headerText}>快来，{'\n'}在这里被欢迎！</Text>
      <View style={{height: 30}}></View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='手机号'
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='用户名'
          style={styles.input}
          onChangeText={SetUsername}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='密码'
          style={styles.input}
          onChangeText={SetPassword}
          value={password}
          autoCapitalize='none'
        />
      </View>

      {/* one line flex */}
      <View style={styles.secondLine}>
        <Text style={styles.headerText}>注册</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Ionicons name= 'arrow-forward-circle' size={60} color="tomato" />
        </TouchableOpacity>

      </View>
      {/* 新建function username，传入参数 props to next page,  */}
      <View style={{height: 40}}></View>
      <TouchableOpacity>

        <Text style={styles.smallText} >已有用户？点我登陆</Text>
      </TouchableOpacity>


    </View>
  )
} 

// 第三页面：登陆老用户
export const SignIn = () => {

  const { signIn } = React.useContext(AuthContext);

  function checkCurrent(){
    const current = AV.User.currentAsync();
    if(current){

      console.log(current);
    }
  }


  return (
    <View style={styles.container}>
      <Text> sign in </Text>
      <Button title='检查现在用户' onPress={checkCurrent} />
      <Button title='测试登陆' onPress={() => signIn()}/>
    </View>
  )
}

// 第四页面：创建用户名
export const CreateName = () => {

  return (
    <View>
      <Text>输入用户名</Text>
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
  // 下面按钮
  loginButton: {
    backgroundColor: 'white',
    width: theme.authWidth,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    width: theme.authWidth-30,
  }
})