import * as React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress, buildArray} from '../api/API'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'


export default function Cards(props) {

  return(
    <View style={styles.container}>
      <Text> 单词一</Text>
      
      
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop+20, 
    backgroundColor: 'white',
    flex: 1,
  },

  oneLine:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: theme.authWidth,
  },
  oneText:{
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30,
  },
})