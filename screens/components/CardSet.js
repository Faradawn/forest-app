import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress} from '../api/API'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Cards(props) {
  const id = props.id
  const loading = [{id:1, chinese:'加载中...', latin:'', family:'', category:''}]
  const [count, setCount] = React.useState(1)
  const [loaded, setLoaded] = React.useState(loading)
  
  
  async function get() {
    const value = await getProgress()
    if (value) { setCount(JSON.parse(value)) } else { setCount(1) }    
  }

  async function load() {
    const value = await loadWordSet(id)
    if (value) { setLoaded(value) } else { loading }
  }

  React.useEffect(() => {load()}, [])
  React.useEffect(() => {get()}, [])

  return(
    <View style={styles.container}>

      <ProgressBar progress={count/loaded.length} />

      <View style={{height: 20}}></View>

      <Card data={(loaded) ? loaded[count - 1] : loading}/>

      <View style={{height: 30}}></View>

      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={() => (count > 1) ? (setProgress(count-1), get()) : {}}>
            <Ionicons name="caret-back" size={24} color="black" />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => (count < loaded.length) ? (setProgress(count+1), get()) : {}}>
            <Ionicons name="caret-forward" size={24} color="black" />
          </TouchableOpacity>
      </View>
        
      <Text>count: {count}</Text>

      <Button 
        title='重新开始'
        onPress={() => (AsyncStorage.clear(), setCount(1))}/>
      
    </View>
  )
}