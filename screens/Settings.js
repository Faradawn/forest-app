import * as React from 'react'
import { Button, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'

import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();


function SettingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title='通用' onPress={() => navigation.navigate('General')}></Button>
      
    </View>
  )
}
function General() {
  return(
    <View>
      <Text> 暗黑模式</Text>
    </View>
  )
}

export default function Home() {  
  return(
    <Stack.Navigator initialRouteName='SettingPage'>
      <Stack.Screen name='SettingPage' component={SettingPage}/>
      <Stack.Screen name='General' component={General}/>
    </Stack.Navigator>

  )
}