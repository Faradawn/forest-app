import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import goldQuotes from '../data/gold1.json'

export const HomeQuote = () => {
  const [flip, setFlip] = React.useState('true')
  var date = new Date();
  var day = date.getDay();
  const [quoteToday, setQuoteToday] = React.useState(goldQuotes.Sheet1[day%34].sentence);

  React.useEffect(()=>{
    setQuoteToday(goldQuotes.Sheet1[day%34].sentence)
  },[day])

  function front() {

    return(      
      <ImageBackground
        source={require('../../assets/wallpaper/card-austere.png')}
        imageStyle={{borderRadius: theme.border}}
        style={style1.imageCard}>
          <View style={{maxWidth: 200}}>
            <Text style={{lineHeight: 20, textAlign: 'center'}}>{quoteToday}</Text>
          </View>
      </ImageBackground> 
    )
  }

  function back() {
    return(
      <ImageBackground
        source={require('../../assets/wallpaper/card-austere.png')}
        imageStyle={{borderRadius: theme.border}}
        style={style1.imageCard}>
          <Text style={{marginBottom: 5}}>{date.getMonth()+1} 月 {date.getDate()} 日</Text>
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