import * as React from 'react'
import { Text, View } from 'react-native'
import styles from '../assets/styles'
import Card from './components/Card'
import Data from './components/Data'


export default function Cards() {
  return(
    <View style={styles.container}>
      {Data.map((value, index) => 
        <Card key={index} 
          id={value.id}
          latin={value.latin}
          chinese={value.chinese}
          />)}
    </View>
  )
}