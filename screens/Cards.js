import * as React from 'react'
import { Button, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'
import CardSet from './components/CardSet'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();


function SetHome({ navigation }) {
  return (
    <View style={styles.cardPage}>
      <TouchableOpacity style={styles.cardUnit} onPress={() => navigation.navigate('Set1')}>

        <Text style={{color: 'grey'}}>Set 1</Text>

      </TouchableOpacity>

      
    </View>
  )
}
function Set1() {
  return(
    <CardSet/>
  )
}

export default function Cards() {  
  return(
    <Stack.Navigator initialRouteName='SetHome'>
      <Stack.Screen name='SetHome' component={SetHome}/>
      <Stack.Screen name='Set1' component={Set1}/>
    </Stack.Navigator>

  )
      
   
}