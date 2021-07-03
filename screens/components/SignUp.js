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
  const query = new AV.Query('Quotes');
  query.equalTo('tags', ['chilren','sth']);
  query.find().then().then((obj) => {
    console.log(obj[0]);
  })
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