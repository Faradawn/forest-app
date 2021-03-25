import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'
import Card from './CardUnit'
import Data from '../api/Data.json'
import createStackNavigator from '@react-navigation/stack'



export default function Cards() {

  const [count, setCount] = React.useState(1)

  return(
    <View style={styles.cardPage}>
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