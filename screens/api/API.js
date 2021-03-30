import AsyncStorage from '@react-native-async-storage/async-storage';
import wordset1 from '../data/wordset1.json'
import wordset2 from '../data/wordset2.json'
import definition1 from '../data/definition1.json'
import definition2 from '../data/definition2.json'
import gold1 from '../data/gold1'

const wordsets = [wordset1, wordset2, gold1]
const definitionsets = [definition1, definition2]

export const loadWordSet = async(id) => {
  if(id < 100){
    return wordsets[id-1].Sheet1
  } 
  if (id > 100) {
    return definitionsets[id%100 - 1].Sheet1
  }
}

// input is an object
export const setProgress = async(key, input) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(input))
  } catch (e) {
    console.log('error storing '+ e)
  }
}

export const getProgress = (key) => {  
    return AsyncStorage.getItem(key)
}

export function buildArray(num) {
  let i = 0;
  let arr = [];
  while(i < num){
    arr.push(false)
    i ++
  }
  console.log('built a length of: ' + arr.length)
  return arr
}

