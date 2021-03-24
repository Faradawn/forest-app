import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'
import Card from './components/Card'
import Data from './api/Data'
import AsyncStorage from '@react-native-async-storage/async-storage';


const store = async(key, input) => {
  try {
    await AsyncStorage.setItem('@key1', 'thing1')
  } catch (e) {
    console.log('error storing on the local device'+ e)
  }
}

const get1 = async(key) => {
  var a, b;
  try {
    a = await AsyncStorage.getItem('@key1').then((values) => {
      b = values
      console.log('then: ' + values)
    })
    if (a != null) {
      console.log('after then:' + a)
    } 
  } catch (e) {
    console.log('error fetching the key' + e)
  }
  console.log(b)
  return b
}

function getbig(key) {
  const [a, setA] = React.useState('')
  AsyncStorage.getItem('@key1').then(value => setA(value))
  return a
  
}




export default function Cards() {
  const [count, setCount] = React.useState(1)

  return(
    <View style={styles.cardsContainer}>
      <View style={styles.touchContainer}>
        <TouchableOpacity 
          style={styles.touchLeft} 
          onPress={() => (count > 1) ? setCount(count-1) : {}}></TouchableOpacity>
        <TouchableOpacity 
          style={styles.touchRight} 
          onPress={() => (count < Data.length) ? setCount(count+1) : {}}></TouchableOpacity>
      </View>
      

      <Card 
        id={Data[count-1].id}
        latin={Data[count-1].latin}
        chinese={Data[count-1].chinese}/>
        
      <Text>count: {count}</Text>
      
    </View>
  )
}