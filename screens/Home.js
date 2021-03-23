import * as React from 'react'
import { Text, View } from 'react-native'
import styles from '../assets/styles'

export default function Home(){
  return(
  <View style={styles.home}>
    <Text style={styles.text}> 你好！</Text>
  </View>
  )
}

