import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles, { theme } from '../../assets/styles'
import goldQuotes from '../data/gold1.json'

export const HomeQuote = () => {
  const [flip, setFlip] = React.useState('true')
  const date = new Date()
  const quoteToday = goldQuotes.Sheet1[date.getDate()%34].sentence 

  function front() {

    return(      
      <ImageBackground
        source={require('../../assets/wallpaper/card-austere.png')}
        imageStyle={{borderRadius: theme.border}}
        style={style1.imageCard}>
          <Text> {quoteToday} </Text>
      </ImageBackground> 
    )
  }

  function back() {
    return(
      <ImageBackground
        source={require('../../assets/wallpaper/card-austere.png')}
        imageStyle={{borderRadius: theme.border}}
        style={style1.imageCard}>
          <Text> {date.getMonth()} 月 {date.getDate()} 日</Text>
          <Text>加油，奋斗的你</Text>
    </ImageBackground>  
    )
  }

  return(
    <View>
      <TouchableOpacity onPress={() => setFlip(!flip)}>
        {flip ? front() : back()}
        <View style={{backgroundColor: 'red', elevation: 5}}/>
      </TouchableOpacity>
    </View>
    
  )
} 

const style1 = StyleSheet.create({
  imageCard: {
    borderRadius: theme.border,
    width: theme.width,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
  }
})