import * as React from 'react'
import { Button, Text, View, StyleSheet, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar'
import {loadWordSet, setProgress, getProgress, buildArray} from '../api/API'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import wordset2 from '../data/wordset2.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CardSet = (props) => {
  // todo
  var wordset;
  wordset = wordset2;

  const [arr, setArr] = React.useState([]);

  React.useEffect(() => {
    setTimeout(async () => {
      try{
        if(arr.length === 0){
          let retrieved = await AsyncStorage.getItem('collection');
          if(retrieved){
            setArr(JSON.parse(retrieved));
            console.log('获取：',retrieved);
          }
        }
      } catch(e){
        console.log(e)
      }
      console.log('loaded');
    }, 500)
  },[])


  const renderItem = ({ item }) => {
    let foundItem = arr.find(val => val.id%(props.id*10000) === parseInt(item.id));
    
    const addMark = async () => {
      let newId = parseInt(item.id) + props.id*10000;
      if(!foundItem){
        setArr([...arr, {id: newId.toString(), date: (new Date()).getTime(), wordset: props.id, info: item}]);
        await AsyncStorage.setItem('collection', JSON.stringify(
          [...arr, {id: newId, date: (new Date()).getTime(), wordset: props.id, info: item}]
        ))
      }
      else{
        setArr(arr.filter(val => val.id%(props.id*10000) !== parseInt(item.id)));
        await AsyncStorage.setItem('collection', JSON.stringify(
          arr.filter(val => val.id%(props.id*10000) !== parseInt(item.id))
        ))
      }
    }

    return (
      <View style={styles.lineContainer}>
        <View style={styles.oneLine}>
          <Text style={styles.first}>{item.chinese}</Text>
          <TouchableOpacity
            onPress={addMark}>
            {foundItem ? <Ionicons name="bookmark" size={24} color="black" />
            : <Ionicons name="bookmark-outline" size={24} color="black" />}
          </TouchableOpacity>
        </View>
        <View style={styles.secondLine}>
          <Text>{item.latin}</Text>
          <Text>{item.category}</Text>
          <Text>{item.family}</Text>
        </View>
      </View>
    );
  };

  return(
    <View style={styles.container}>
      <Text> 单词一</Text>
      <View style={styles.flatlist}>
        <FlatList
          data={wordset.Sheet1}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      
    </View>
  )
}



export const VocabCollection = () => {

  const [arr, setArr] = React.useState([]);
  console.log(arr);

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
      console.log('collection loaded');
    }, 500)
  },[])


  const renderItem = ({ item }) => {
    console.log('time:', (new Date(item.date)).getDay())
    
    
    return (
      <View style={styles.lineContainer}>
        <Text>{item.date}</Text>
        <Text>{item.info.chinese}</Text>
      </View>
    );
  };


  return(
    <View style={styles.container}>
      <Text> 我的单词收藏</Text>
      <View style={styles.flatlist}>
        <FlatList
          data={arr}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Button title='clear collection' onPress={() =>
           AsyncStorage.removeItem('collection').then((val)=>console.log('cleared:', val))}>

        </Button>
       
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
    width: theme.authWidth+10,
    height: theme.height+200,
  },
  lineContainer:{
    width: theme.authWidth,
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.3,
    marginTop: 40,
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
    width: theme.authWidth,
  },

  // flatlist

})