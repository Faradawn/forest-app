import * as React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'


export default function Card(props) {
  const [flip, setFlip] = React.useState('false')
  

  return(
    <View>
      <TouchableOpacity style={styles.cardUnit} onPress={() => setFlip(!flip)}>
        <Text>{flip ? props.latin : props.chinese}</Text> 
      </TouchableOpacity>
    </View>
  )
}