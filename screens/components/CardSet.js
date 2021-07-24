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


export const CardSetVar = ({route, navigation}) => {
  var wordset;
  switch (route.params.id) {
    case 2:
      wordset = wordset2;
      break;
    default: 
      wordset = wordset1;
      break;
  }

  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    setTimeout(async () => {
      try{
        if(arr.length === 0){
          let retrieved = await AsyncStorage.getItem('collection');
          if(retrieved){
            setArr(JSON.parse(retrieved));
            console.log('loaded wordset',route.params.id);
          }
        }
      } catch(e){
        console.log(e)
      }
    }, 500)
  },[])


  const renderItem = ({ item }) => {
    let foundItem = arr.find(val => val.id%(route.params.id*10000) === parseInt(item.id));
    // trucation
    let str = item.latin.concat(" ", item.family, " ", item.category);
    
    const addMark = async () => {
      let newId = (parseInt(item.id) + route.params.id*10000).toString();
      if(!foundItem){
        setArr([...arr, {id: newId, date: (new Date()).getTime(), wordset: route.params.id, info: item}]);
        await AsyncStorage.setItem('collection', JSON.stringify(
          [...arr, {id: newId, date: (new Date()).getTime(), wordset: route.params.id, info: item}]
        ))
      }
      else{
        setArr(arr.filter(val => val.id%(route.params.id*10000) !== parseInt(item.id)));
        await AsyncStorage.setItem('collection', JSON.stringify(
          arr.filter(val => val.id%(route.params.id*10000) !== parseInt(item.id))
        ))
      }
    }
    const playSound = async () => {
      const {sound} = await Audio.Sound.createAsync(switchSound(route.params.id, item.id));
      await sound.playAsync(); 
    }

    // 每一个小单词
    return (
      <View style={styles.lineContainer}>
        <View style={styles.lineCard}>
          <View style={styles.oneLine}>
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={playSound}>
                <Ionicons name="volume-medium-outline" size={24} color ="tomato" />
              </TouchableOpacity>
              <Text style={{fontSize: 20, marginLeft: 10}}>{item.chinese}</Text>
            </View>

            <TouchableOpacity
              onPress={addMark}>
              {foundItem ? <Ionicons name="bookmark" size={24} color="gold" />
              : <Ionicons name="bookmark-outline" size={24} color="grey" />}
            </TouchableOpacity>
          </View>

          <View style={styles.secondLine}>
            <Text>{str}</Text>
          </View>
        </View>

      </View>
    );
  };
  // end of renderItem

  return(
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{paddingTop: theme.marginTop, left: 30, top: -10}}>
        <TouchableOpacity 
          onPress={()=>navigation.goBack()}>
            <Ionicons name='arrow-back' size={20} color='grey'/>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>
          {route.params.id === 1 ? '园林树木拉丁名150个' : '园林花卉拉丁名200个'}</Text>
        <Image 
          source={require('../../assets/images/divider-line.png')}
          style={{height: 10, width: 150, marginTop: 15, marginBottom: 20}}
        />
        <View style={styles.flatlist}>
          <FlatList
            data={wordset.Sheet1}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        
      </View>
    </View>
  )
}

// TODO: 单词本
export const VocabCollection = ({navigation}) => {

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

  // here  
  return(
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{paddingTop: theme.marginTop, left: 30, top: -10}}>
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