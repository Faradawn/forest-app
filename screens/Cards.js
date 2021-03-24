import * as React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'
import Card from './components/Card'
import Data from './components/Data'


export default function Cards() {

  const [count, setCount] = React.useState(1)

  return(
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.touchLeft} 
        onPress={() => (count > 1) ? setCount(count-1) : {}}></TouchableOpacity>

      <TouchableOpacity 
        style={styles.touchRight} 
        onPress={() => (count < Data.length) ? setCount(count+1) : {}}></TouchableOpacity>

      <Card 
        id={Data[count-1].id}
        latin={Data[count-1].latin}
        chinese={Data[count-1].chinese}/>
        
      <Text>count: {count}</Text>
      
    </View>
  )
}