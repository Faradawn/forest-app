import * as React from 'react'
import { Button, Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress, buildArray} from '../api/API'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import wordset2 from '../data/wordset2.json';
import wordset1 from '../data/wordset1.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { switchSound } from '../api/switchSound';
import { Entypo } from '@expo/vector-icons';


export const CollectionModal = ({navigation}) => {

  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    setTimeout(async () => {
      try{
        if(arr.length === 0){
          let retrieved = await AsyncStorage.getItem('collection');
          setArr(JSON.parse(retrieved));
        }
      } catch(e){
        console.log(e)
      }
      console.log('loaded 单词本');
    }, 500)
  },[])


  const renderItem = ({ item }) => {
  
    let str = item.info.latin.concat(" ", item.info.family, " ", item.info.category);
  
    const removeMark = async () => {
      setArr(arr.filter(val => val.id !== item.id));
      await AsyncStorage.setItem('collection', JSON.stringify(
        arr.filter(val => val.id !== item.id)
      ))
    }
    const playSound = async () => {
      const {sound} = await Audio.Sound.createAsync(switchSound(item.wordset, item.info.id));
      await sound.playAsync(); 
    }

    // 单词本每个单词
    return (
      <View style={styles.lineContainer}>
      <View style={styles.lineCard}>
        <View style={styles.oneLine}>
          <View style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={playSound}>
              <Ionicons name="volume-medium-outline" size={24} color ="tomato" />
            </TouchableOpacity>
            <Text style={{fontSize: 20, marginLeft: 10}}>{item.info.chinese}</Text>
          </View>

          <TouchableOpacity
              onPress={removeMark}>
              <Ionicons name="remove-circle-outline" size={20} color="black" />
            </TouchableOpacity>
        </View>

        <View style={styles.secondLine}>
          <Text>{str}</Text>
        </View>
      </View>

    </View>

    );
  };

  // 单词本总页面  
  return(
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{paddingTop: theme.marginTop, left: 30}}>
        <TouchableOpacity 
          onPress={()=>navigation.goBack()}>
            <Ionicons name='arrow-back' size={20} color='grey'/>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 30}}> 我的单词本</Text>
        <View style={styles.flatlist}>
          <FlatList
            data={arr}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        
        </View>

      </View>
    </View>
    
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop, 
    backgroundColor: 'white',
    flex: 1,
  },
  flatlist: {
    height: theme.height+200,
  },
  lineContainer:{
    width: theme.width+50,
    display: 'flex',
    alignItems: 'center',    
    marginBottom: 40,
  },
  lineCard:{
    backgroundColor: 'white',
    borderBottomWidth: 1,

  },
  oneLine:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: theme.authWidth,
  },
  oneText:{
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30,
  },
  secondLine:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-start',
    marginTop: 3,
    marginBottom: 10,
    opacity: 0.8,
    maxWidth: theme.authWidth,
  },

  // flatlist

})