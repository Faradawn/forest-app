import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {setProgress, getProgress} from '../api/API'

export default function Cards(props) {
  const Data = props.wordset  
  const [count, setCount] = React.useState(1)
  const [progress, setProgress] = React.useState(1)
  

  async function get() {
    const b = await getProgress()
    setProgress(b)
    
  }

  React.useEffect(() => {get()}, [])

  return(
    <View style={styles.container}>

      <ProgressBar progress={5}/>

      <Button
        title='set progress'
        onPress={() => setProgress()}/>
      <Button 
        title='get'
        onPress={() => get()}/>
      <Text>{progress}</Text>

      <View style={{height: 20}}></View>

      <Card 
        id={Data[count-1].id}
        latin={Data[count-1].latin}
        chinese={Data[count-1].chinese}/>

      <View style={{height: 30}}></View>

      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={() => (count > 1) ? setCount(count-1) : {}}>
            <Ionicons name="caret-back" size={24} color="black" />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => (count < Data.length) ? setCount(count+1):{}}>
            <Ionicons name="caret-forward" size={24} color="black" />
          </TouchableOpacity>
      </View>
        
      <Text>count: {count}</Text>
      
    </View>
  )
}