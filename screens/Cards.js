import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles, {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import CardSet from './components/CardSet'

const Stack = createStackNavigator();

function SetHome({ navigation }) {
  return (
    <View style={styles.homePage}>
      <TouchableOpacity onPress={() => navigation.navigate('Set1')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            <Text> 园林树木拉丁名150个 </Text>
        </ImageBackground> 
      </TouchableOpacity>

      <View style={{height:30}}></View>

      <TouchableOpacity onPress={() => navigation.navigate('Set2')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            <Text> 园林花卉拉丁名200个 </Text>
        </ImageBackground> 
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

const style1 = StyleSheet.create({
  imageCard: {
    height: 130,
    borderRadius: theme.border,
    width: theme.width+50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.4,
  }
})