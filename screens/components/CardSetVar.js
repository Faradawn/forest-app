import * as React from 'react'
import { Button, Text, View, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import wordset2 from '../data/wordset2.json';
import wordset1 from '../data/wordset1.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { switchSound } from '../api/switchSound';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { setQuizDone, setWordDone1, setWordDone2 } from '../store/store'

const {width, height} = Dimensions.get('screen');


export const CardSetVar = ({route, navigation}) => {
  const [arr, setArr] = React.useState([]);
  const [cardMode, setCardMode] = React.useState(null);
  const [cardIndex, setCardIndex] = React.useState(-1);
  var dispatch = useDispatch();
  var wordset;
  switch (route.params.id) {
    case 2:
      wordset = wordset2;
      break;
    default: 
      wordset = wordset1;
      break;
  }

  const loadAsync = async () => {
    let retrievedStar = await AsyncStorage.getItem('collection');
    if(retrievedStar){setArr(JSON.parse(retrievedStar));}

    let retrievedFlip = await AsyncStorage.getItem(`flip${route.params.id}`)
    if(cardMode === null){
      if(retrievedFlip === null || retrievedFlip === 'false'){setCardMode(false)}
      else{setCardMode(true)}
    }

    let retrievedCardIndex = await AsyncStorage.getItem(`mylist${route.params.id}`);
    if(retrievedCardIndex){ setCardIndex(parseInt(retrievedCardIndex)); }else{setCardIndex(0);}
  }
  React.useEffect(() => {
    setTimeout(loadAsync, 10)
  },[])


  const renderItem = ({ item }) => {
    let foundItem = arr.find(val => val.id%(route.params.id*10000) === parseInt(item.id));
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
              <Text style={{fontSize: 20, marginLeft: 10}}>{item.id}. {item.chinese}</Text>
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

  // TODO: 拉丁名总页面
  if(cardIndex < 0 || cardMode === null){
    return <View></View>
  } else {
  return(
    <View style={{backgroundColor: 'white', flex: 1}}>
    
      <View style={{marginTop: theme.marginTop, left: 30}}>
        <TouchableOpacity 
          onPress={async ()=>{
            await AsyncStorage.setItem(`flip${route.params.id}`, JSON.stringify(cardMode));
            let index1 = await AsyncStorage.getItem('mylist1') 
            let index2 = await AsyncStorage.getItem('mylist2')
            if(index1){dispatch(setWordDone1(parseInt(index1)))}
            if(index2){dispatch(setWordDone2(parseInt(index2)))}
            navigation.goBack(); 
          }}>
            <Ionicons name='arrow-back' size={20} color='grey'/>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20}}>
          {route.params.id === 1 ? '园林树木拉丁名150个' : '园林花卉拉丁名200个'}</Text>
        <TouchableOpacity onPress={() => {
          setCardMode(!cardMode);
          cardMode ? loadAsync() : {}
          }
           }>
          {cardMode ? 
            <Entypo name="list" size={24} color="black" 
              style={{height: 25, marginTop: 15, marginBottom: 20}}/> 
            : 
            <Image 
              source={require('../../assets/images/flip-line-icon.png')}
              style={{height: 25, width: 25, marginTop: 15, marginBottom: 20}}
            /> 
          }
        </TouchableOpacity>

        {cardMode ?
          <Card 
            data={wordset.Sheet1} 
            collection={arr}
            wordset_id={route.params.id}
            cardIndex={cardIndex}/>
          : 
          <View style={styles.flatlist}>
            <FlatList 
              data={wordset.Sheet1}
              renderItem={renderItem} 
              keyExtractor={item => item.id}
              />
          </View>}
        
      </View>
    </View> 

  )}
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop, 
    backgroundColor: 'white',
    flex: 1,
  },
  flatlist: {
    height: height-theme.marginTop-100, // here
  },
  lineContainer:{
    width: theme.width+50,
    display: 'flex',
    alignItems: 'center',    
    paddingBottom: 10,
    height: 90
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