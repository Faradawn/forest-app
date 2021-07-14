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
import { createStackNavigator } from '@react-navigation/stack'

const CardSetMain = ({route, navigation}) => {
  console.log(route);
  // todo
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
            console.log('loaded wordset',route.params.id, retrieved);
          }
        }
      } catch(e){
        console.log(e)
      }
    }, 500)
  },[])


  const renderItem = ({ item }) => {
    let foundItem = arr.find(val => val.id%(route.params.id*10000) === parseInt(item.id));
    
    const addMark = async () => {
      let newId = parseInt(item.id) + route.params.id*10000;
      if(!foundItem){
        setArr([...arr, {id: newId.toString(), date: (new Date()).getTime(), wordset: route.params.id, info: item}]);
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

    return (
      <View style={styles.lineContainer}>
        <View style={styles.lineCard}>

          <View style={styles.oneLine}>
            <Text style={{fontSize: 20}}>{item.chinese}</Text>
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
      </View>
    );
  };

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
          style={{height: 10, width: 150, marginTop: 20}}
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

export const CardSet = () => {
  const Stack = createStackNavigator();
  return(
    <Stack.Navigator>
      <Stack.Screen name='CardSetNew' component={CardSetMain} options={{headerShown: false}}/>
    </Stack.Navigator>
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

  // here  
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
  },

  // flatlist

})