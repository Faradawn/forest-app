import React from 'react'
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { theme } from '../../assets/styles'

import AV from 'leancloud-storage/core';
import { AuthContext } from '../api/context';

const SignIn = () => {

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

export default SignIn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop,
  }
})