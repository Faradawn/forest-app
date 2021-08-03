import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import goldQuotes from '../data/gold1.json'

const {width, height} = Dimensions.get('screen');

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
    width: width < 600 ? theme.width : theme.width-200,
    height: width < 600 ? 200 : 300,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
  }
})