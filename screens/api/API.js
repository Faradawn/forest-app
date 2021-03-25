import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Data from './Data'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const setProgress = async(input) => {
  try {
    await AsyncStorage.setItem('@key1', input.toString())
  } catch (e) {
    console.log('error storing '+ e)
  }
}

export const getProgress = () => {  
    return AsyncStorage.getItem('@key1')
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
