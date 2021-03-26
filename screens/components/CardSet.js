import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress} from '../api/API'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Cards(props) {
  const id = props.id
  const STORAGE_KEY = `@wordset${id}`
  const loading = [{id:1, chinese:'加载中...', latin:'', family:'', category:''}]
  const [count, setCount] = React.useState(1)
  const [starred, setStar] = React.useState(false)
  const [loaded, setLoaded] = React.useState(loading)
  
  React.useEffect(() => {get()})
  React.useEffect(() => {load()}, [])

  async function load() {
    const value = await loadWordSet(id)
    if (value) { setLoaded(value) } else { loading }
  }

  async function get() {
    const value = await getProgress(STORAGE_KEY)
    const obj = JSON.parse(value)
    if (obj)
     { (setCount(obj.progress), setStar(obj.starred)) } 
    else
      { setCount(1), setStar(false) }    
  }
  
  function set(num) {
    const obj = {progress: num, starred: starred}
    setProgress(STORAGE_KEY, obj)
  }

  return(
    <View style={styles.container}>
      <ProgressBar progress={count/loaded.length} />
      <View style={{height: 20}}></View>

      <TouchableOpacity onPress={() => setStar(!starred)}>
        <Ionicons name= {starred ? 'star' : 'star-outline'} size={24} color="black" />
      </TouchableOpacity>

      <Card data={(loaded) ? loaded[count - 1] : loading} initflip={true}/>

      <View style={{height: 30}}></View>

      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={() => (count > 1) ? (set(count-1), get()) : {}}>
            <Ionicons name="caret-back" size={24} color="black" />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => (count < loaded.length) ? (set(count+1), get()) : {}}>
            <Ionicons name="caret-forward" size={24} color="black" />
          </TouchableOpacity>
      </View>
        
      <Text>count: {count}</Text>
      <Text>starred?: {starred ? 'true' : 'false' }</Text>

      <Button 
        title='重新开始'
        onPress={() => (AsyncStorage.clear(), setCount(1))}/>
      
    </View>
  )
}