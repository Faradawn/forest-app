import React from 'react'
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { theme } from '../../assets/styles'

import AV from 'leancloud-storage/core';

const SignIn = () => {

  function checkCurrent(){
    const current = AV.User.currentAsync();
    if(current){

      console.log(current);
    }
  }


  return (
    <View>
      <Text> sign in </Text>
      <Button title='检查现在用户' onPress={checkCurrent} />
    </View>
  )
}

export default SignIn;