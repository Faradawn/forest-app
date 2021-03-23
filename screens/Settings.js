import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import styles from '../assets/styles'

const Drawer = createDrawerNavigator()

function Account({ navigation }) {
  return (
    <View style={styles.container}>
      <Text> Account </Text>
      <Button title='Back to Home ' onPress={() => navigation.navigate('Home')}/>
    </View>
  )
}
function General() {
  return (
    <View style={styles.container}>
      <Text> General </Text>
    </View>
  )
}
export default function Settings() {
  return (
    
      <Drawer.Navigator>
        <Drawer.Screen name='General' component={General}/>
        <Drawer.Screen name='Account' component={Account}/>
      </Drawer.Navigator>
    
  )
}
