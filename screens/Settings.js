import * as React from 'react'
import { Button, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'

import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Stack = createStackNavigator();


function SettingPage({ navigation }) {
  return (
    <View style={styles.homePage}>
      <Button title='关于我们' onPress={() => navigation.navigate('关于我们')}></Button>
      <Button 
        title='清除所有进度和星标'
        onPress={() => AsyncStorage.clear()}/>
      
    </View>
  )
}
function General() {
  return(
    <View style={styles.homePage}>
      <Text> 暗黑模式</Text>
    </View>
  )
}

export default function Home() {  
  return(
    <Stack.Navigator initialRouteName='SettingPage'>
      <Stack.Screen name='设置' component={SettingPage}/>
      <Stack.Screen name='关于我们' component={General}/>
    </Stack.Navigator>

  )
}