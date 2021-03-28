import * as React from 'react'
import { Button, Text, View } from 'react-native'
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress, buildArray} from '../api/API'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Cards(props) {
  // loading data
  const id = props.id
  const STORAGE_KEY = `@wordset${id}`
  const loading = [{id:1, chinese:'加载中...', latin:'', family:'', category:''}]
  const [count, setCount] = React.useState(1)
  const [loaded, setLoaded] = React.useState(loading)
  // star counter
  const [onestar, setOneStar] = React.useState(false)
  const [arrayStar, setArrayStar] = React.useState([false])
  
  React.useEffect(() => {get()}, [count])
  React.useEffect(() => {load()}, [])

  // API calls
  async function load() {
    const wordset = await loadWordSet(id)
    if (wordset) { 
      setLoaded(wordset)
      const storage = await getProgress(STORAGE_KEY)
      const obj = JSON.parse(storage)
      if (obj) {
        if (obj.progress && obj.starred) { // progress and star
          setCount(obj.progress)
          setArrayStar(obj.starred)
        }
        else if (obj.progress) { // only progress no star
          setCount(obj.progress)
          setArrayStar(buildArray(wordset.length))
        }
      }
      else {
        setCount(1)
        setArrayStar(buildArray(wordset.length))
      }
    }
    else { console.log('error loading data') }
  }

  async function get() {
    const value = await getProgress(STORAGE_KEY)
    const obj = JSON.parse(value)
    console.log('get data')
    if (obj)
     { setCount(obj.progress)} 
    else
      { setCount(1) }    
  }

  function set(num) {
    setCount(num)
    const obj = {progress: num, starred: arrayStar, totalLength: loaded.length}
    setProgress(STORAGE_KEY, obj)
    console.log('set data')
  }

  // next and back button
  function next(){
    let a = arrayStar
    a[count-1] = onestar
    setArrayStar(a)
    setOneStar(arrayStar[count])
  }

  function back(){
    let a = arrayStar
    a[count-1] = onestar
    setArrayStar(a)
    setOneStar(arrayStar[count-2])
  }

  return(
    <View style={styles.container}>
      <ProgressBar progress={count/loaded.length} />
      <View style={{height: 20}}></View>

      <TouchableOpacity onPress={() => setOneStar(!onestar)}>
        <Ionicons name= {onestar ? 'star' : 'star-outline'} size={24} color="black" />
      </TouchableOpacity>

      <Card data={(loaded) ? loaded[count - 1] : loading} initflip={true}/>

      <View style={{height: 30}}></View>

      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={() => (count > 1) ? (set(count-1), back()) : {}}>
            <Ionicons name="caret-back" size={24} color="black" />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => (count < loaded.length) ? (set(count+1), next()) : {}}>
            <Ionicons name="caret-forward" size={24} color="black" />
          </TouchableOpacity>
      </View>
        
      <Text>count: {count}</Text>
      <Text>star? {onestar}</Text>

      <Button 
        title='重新开始'
        onPress={() => (setCount(1), setArrayStar(buildArray(wordset.length)), console.log(arrayStar))}/>
      <Button 
        title='清除记录'
        onPress={() => AsyncStorage.clear()}/>
      
      
    </View>
  )
}