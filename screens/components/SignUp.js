import React from 'react'
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { theme } from '../../assets/styles'

import AV from 'leancloud-storage/core';
import { TouchableOpacity } from 'react-native-gesture-handler';


const SignUp = () => {
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
    <View style={styles.container}>

      <Text style={styles.headerText}>在这里注册</Text>

      <TextInput 
        placeholder='手机号'
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        keyboardType='numeric'
      />
      <TextInput 
        placeholder='用户名'
        style={styles.input}
        onChangeText={SetUsername}
        value={username}
      />
      <TextInput 
        placeholder='密码'
        style={styles.input}
        onChangeText={SetPassword}
        value={password}
        autoCapitalize='none'
      />
      <TouchableOpacity onPress={handleSignUp}>
        <Text> Let's Go! </Text>
      </TouchableOpacity>
      {/* 新建function username，传入参数 props to next page,  */}

      <Text style={styles.smallText} >已有用户？点我登陆</Text>



    </View>
  )
} 

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: theme.marginTop + 30,
    marginLeft: theme.padding,
  },

  input: {
    height: 40,
    width: theme.width-50,
    marginBottom: 20,
    paddingLeft: 15,
    borderWidth: 1,
    alignItems: 'center',
  },

  headerText: {
    fontSize: 30,
    letterSpacing: 10,
    marginBottom: 30,
  },

  smallText: {
    color: 'black',
  }
});