import * as React from 'react'
import { Alert, Button, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import wordset1 from '../data/wordset1.json'
import wordset2 from '../data/wordset2.json'
import gold1 from '../data/gold1'

const allsets = [wordset1, wordset2, gold1]

export const loadWordSet = async(id) => {
  return allsets[id-1].Sheet1
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

