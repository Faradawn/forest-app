import * as React from 'react'
import { Button, Text, View, StyleSheet, Dimensions } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';


export default function ProgressBar(props) {
  
  return (
   <View style={styles().barContainer}>
     <View style={styles(props.progress).rectangle}>
     </View>
   </View> 
  )
}

const styles = (a) =>  StyleSheet.create({
  barContainer: {
    width: Dimensions.get('window').width - 70,
    height: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  rectangle: {
    width: a * (Dimensions.get('window').width - 70),
    height: 10,
    backgroundColor: 'orange',
    borderRadius: 5,    

  }
})