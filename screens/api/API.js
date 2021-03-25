import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Data from './Data'
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = async(key, input) => {
  try {
    await AsyncStorage.setItem('@key1', 'thing1')
    console.log('Stored: ' + 'thing1')
  } catch (e) {
    console.log('error storing '+ e)
  }
}



export default function API(){
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