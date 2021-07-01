import * as React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styles, { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress, buildArray} from '../api/API'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'


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
    if (obj)
     { setCount(obj.progress)} 
    else
      { setCount(1) }    
  }

  function set(num) {
    setCount(num)
    const obj = {progress: num, starred: arrayStar, totalLength: loaded.length}
    setProgress(STORAGE_KEY, obj)
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

  const [sound, setSound] = React.useState();

  async function playSound(){
    const {sound} = await Audio.Sound.createAsync(require('../../assets/raw_assets/4_voice/0001.mp3'));
    setSound(sound);
    await sound.playAsync(); 
    console.log('played sound');
  }

  return(
    <View style={styles.container}>
      <ProgressBar progress={count/loaded.length} />
      <View style={{height: 20}}></View>

      <TouchableOpacity onPress={() => setOneStar(!onestar)}>
        <Ionicons name= {onestar ? 'star' : 'star-outline'} size={24} color="orange" />
      </TouchableOpacity>

      <View style={{height: 20}}></View>

      <Card data={(loaded) ? loaded[count - 1] : loading} initflip={true}/>

      <View style={{height: 20}}></View>
      <Text> 第 {count} / {loaded ? loaded.length : '?'} 个</Text>

      <View style={{height: 20}}></View>

      <View style={styles.touchContainer}>
        <TouchableOpacity onPress={() => (count > 1) ? (set(count-1), back()) : {}}>
            <Ionicons name="caret-back" size={50} color="black" />
        </TouchableOpacity>
        <View style={{width:100}}/>




        <Button onPress={playSound} title='读音'> </Button>




        <View style={{width:100}}/>
        <TouchableOpacity onPress={() => (count < loaded.length) ? (set(count+1), next()) : {}}>
            <Ionicons name="caret-forward" size={50} color="black" />
          </TouchableOpacity>
      </View>

      
      
    </View>
  )
}

const style1 = StyleSheet.create({
  imageCard: {
    height: 100,
    borderRadius: theme.border,
    width: theme.width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
  }
})