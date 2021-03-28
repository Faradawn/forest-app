import * as React from 'react'
import { Button, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import CardSet from './components/CardSet'

const Stack = createStackNavigator();

function SetHome({ navigation }) {
  return (
    <View style={styles.cardPage}>
      <TouchableOpacity style={styles.cardUnit} onPress={() => navigation.navigate('Set1')} >
        <Text style={{color: 'grey'}}>园林树木拉丁名150个</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardUnit} onPress={() => navigation.navigate('Set2')} >
        <Text style={{color: 'grey'}}>园林花卉拉丁名200个</Text>
      </TouchableOpacity>
    </View>
  )
}
function Set1() {
  return(
    <CardSet id={1}/>
  )
}

function Set2() {
  return (
    <CardSet id={2}/>
  )
}

export default function Cards() {  
  return(
    <Stack.Navigator initialRouteName='SetHome'>
      <Stack.Screen name='SetHome' component={SetHome}/>
      <Stack.Screen name='Set1' component={Set1}/>
      <Stack.Screen name='Set2' component={Set2}/>
    </Stack.Navigator>

  )
      
   
}