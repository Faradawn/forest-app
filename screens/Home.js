import * as React from 'react'
import { Button, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'

import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator();


function HomePage({ navigation }) {
  return (
    <View style={styles.homePage}>
      <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('Quote')}>

        <Text style={{color: 'grey'}}>每日名言</Text>

      </TouchableOpacity>

      
    </View>
  )
}
function Quote() {
  return(
    <View>
      <Text> 一曲未终，已被弃于四季</Text>
    </View>
  )
}

export default function Home() {  
  return(
    <Stack.Navigator initialRouteName='HomePage'>
      <Stack.Screen name='HomePage' component={HomePage}/>
      <Stack.Screen name='Quote' component={Quote}/>
    </Stack.Navigator>

  )
}