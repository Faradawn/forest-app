import React from 'react'
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { theme } from '../../assets/styles'
// import LeanCloud from '../api/LeanCloudInit'
import AV from 'leancloud-storage/core';



function handleSignUp({username, password}) {
  User.signUp({username, password})
    .then((userObj) => {
      setUser(userObj);
      setErrMsg('');
    })
    .catch((error) => setErrMsg(error.message));
}

function test(){
  const About = AV.Object.extend('About');
  const about = new About();
  about.set('type', 'about-main-text');
  about.set('number', '1');
  about.set('text', '这个是一套/园林植物拉丁学名单词记忆卡/帮助风景园林、园林、观赏园艺专业的朋友；/北林考研得力助手,/唯愿帮你渡过 “拉丁之河”，/早日上岸，修成正果！/祝度过愉快的一天！');
  about.save().then((obj) => {
    console.log('保存的: ', obj);
  }, error => console.log(error));
}



const SignUp = () => {
  const [phone, setPhone] = React.useState(null);
  const [password, SetPassword] = React.useState('');

  function handleSubmit(){
    console.log(phone, password);

  }

  return(
    <View style={styles.container}>
      <Text>注册这里</Text>
      <TextInput 
        placeholder='手机号'
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        keyboardType='numeric'
      />
      <TextInput 
        placeholder='密码'
        style={styles.input}
        onChangeText={SetPassword}
        value={password}
        autoCapitalize='none'
      />

      <Button onPress={handleSubmit} title='注册'/>
      <Button onPress={test} title='提交名言'/>


    </View>
  )
} 

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  input: {
    height: 40,
    width: theme.width-50,
    margin: 20,
    paddingLeft: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
});