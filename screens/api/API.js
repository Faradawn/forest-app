import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Data from './Data'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import wordset1 from './wordset1.json'

const allsets = [wordset1]

export const loadWordSet = async(id) => {
  return allsets[id-1].Sheet1
}

// input is an object
export const setProgress = async(key, input) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(input))
  } catch (e) {
    console.log('error storing '+ e)
  }
}

export const getProgress = (key) => {  
    return AsyncStorage.getItem(key)
}

export function buildArray(num) {
  let i = 0;
  let arr = [];
  while(i < num){
    arr.push(false)
    i ++
  }
  console.log('built a length of: ' + arr.length)
  return arr
}

export function API(){
  const [a, setA] = React.useState('')

  async function getbig() {  
    const b = await AsyncStorage.getItem('@key1')
    setA(b)
  }

  React.useEffect(() => {getbig()}, [])

  return(
    <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
      <Button
        title='store'
        onPress={() => store()}/>
      <Button 
        title='get'
        onPress={() => getbig()}/>
      <Text>{a}</Text>
    </View>
    
  )
}
