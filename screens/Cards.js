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
      <TouchableOpacity onPress={() => navigation.navigate('园林树木拉丁名150个')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            <Text> 园林树木拉丁名150个 </Text>
        </ImageBackground> 
      </TouchableOpacity>

      <View style={{height:30}}/>

      <TouchableOpacity onPress={() => navigation.navigate('园林花卉拉丁名200个')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            <Text> 园林花卉拉丁名200个 </Text>
        </ImageBackground> 
      </TouchableOpacity>

      <View style={{height:30}}/>

      <TouchableOpacity onPress={() => navigation.navigate('【释义】园林树木拉丁名150个')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            <Text> 【释义】园林树木拉丁名150个 </Text>
        </ImageBackground> 
      </TouchableOpacity>

      <View style={{height:30}}/>
      <TouchableOpacity onPress={() => navigation.navigate('【释义】园林花卉拉丁名200个')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            <Text> 【释义】园林花卉拉丁名200个 </Text>
        </ImageBackground> 
      </TouchableOpacity>
     
    </View>
  )
}
function Set1() { return <CardSet id={1}/> }
function Set2() { return <CardSet id={2}/> }
function Set3() { return <CardSet id={101}/>}
function Set4() { return <CardSet id={102}/>}

 
export default function Cards() {  
  return(
    <Stack.Navigator initialRouteName='所有卡片'>
      <Stack.Screen name='所有卡片' component={SetHome}/>
      <Stack.Screen name='园林树木拉丁名150个' component={Set1}/>
      <Stack.Screen name='园林花卉拉丁名200个' component={Set2}/>
      <Stack.Screen name='【释义】园林树木拉丁名150个' component={Set3}/>
      <Stack.Screen name='【释义】园林花卉拉丁名200个' component={Set4}/>
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