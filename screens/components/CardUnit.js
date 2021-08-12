import * as React from 'react'
import { FlatList, Text, View, StyleSheet, ImageBackground, Dimensions, Button } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import styles, {theme} from '../../assets/styles'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { switchSound } from '../api/switchSound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
const { width, height } = Dimensions.get('screen');

/**
 * Form for user login
 * @param {object} props Component props
 * @param {array} props.data Wordset data
 * @param {array} props.collection Star data
 * @param {number} props.wordset_id Wordset number
 * @param {number} props.cardIndex scroll to index
 */
export default function Card(props) {
  const [flip, setFlip] = React.useState(true);
  const [arr, setArr] = React.useState(props.collection);
  const [currIndex, setCurrIndex] = React.useState(props.cardIndex);
  const flatListRef = React.useRef(null);

  var numRender;
  if(props.cardIndex < 10){
    numRender = 15
  } else if(props.cardIndex + 5 > props.data.length){
    numRender = props.data.length
  } else {
    numRender = props.cardIndex + 5
  }

  React.useEffect(()=>{
    setTimeout(()=>{
      if(flatListRef){
        flatListRef.current.scrollToIndex({index: props.cardIndex});
      }
    }, 100)
  }, [])

  const onViewableChange = useCallback(({ viewableItems, changed }) => {
    let i = changed[0].index;
    if(i < 0){i = 0}
    setCurrIndex(i)
    setTimeout(()=>{AsyncStorage.setItem(`mylist${props.wordset_id}`, JSON.stringify(i));}, 100)
  }, []); 

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  }

  const jumpForward = (val) => {
    let len = props.data.length;
    switch (val) {
      case -10:
        if(currIndex - 10 <= 0){
          flatListRef.current.scrollToIndex({index: 0})
          setCurrIndex(0)
        } else{
          flatListRef.current.scrollToIndex({index: currIndex-10})
          setCurrIndex(currIndex-10)
        }
        break;
      case -1:
        if(currIndex - 1 <= 0){
          flatListRef.current.scrollToIndex({index: 0})
          setCurrIndex(0)
        } else{
          flatListRef.current.scrollToIndex({index: currIndex-1})
          setCurrIndex(currIndex-1)
        } 
        break;
      case 10:
        if(currIndex + 10 >= len-1){
          flatListRef.current.scrollToIndex({index: len-1})
          setCurrIndex(len-1)
        }else{
          flatListRef.current.scrollToIndex({index: currIndex+10})
          setCurrIndex(currIndex+10)
        }
        break;
      case 1:
        if(currIndex + 1 >= len-1){
          flatListRef.current.scrollToIndex({index: len-1})
          setCurrIndex(len-1)
        }else{
          flatListRef.current.scrollToIndex({index: currIndex+1})
          setCurrIndex(currIndex+1)
        }
        break;
      default:
        return
    }
  }

  const renderItem = ({item}) => {
    let foundItem = arr.find(val => val.id%(props.wordset_id*10000) === parseInt(item.id));
    const addMark = async () => {
      let newId = (parseInt(item.id) + props.wordset_id*10000).toString();
      if(!foundItem){
        setArr([...arr, {id: newId, date: (new Date()).getTime(), wordset: props.wordset_id, info: item}]);
        await AsyncStorage.setItem('collection', JSON.stringify(
          [...arr, {id: newId, date: (new Date()).getTime(), wordset: props.wordset_id, info: item}]
        ))
      }
      else{
        setArr(arr.filter(val => val.id%(props.wordset_id*10000) !== parseInt(item.id)));
        await AsyncStorage.setItem('collection', JSON.stringify(
          arr.filter(val => val.id%(props.wordset_id*10000) !== parseInt(item.id))
        ))
      }
    }
    const playSound = async () => {
      const {sound} = await Audio.Sound.createAsync(switchSound(props.wordset_id, item.id));
      await sound.playAsync(); 
    }

    return(
      <View style={{width, height: 230, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {setFlip(!flip)}}>
          <ImageBackground
            source={require('../../assets/wallpaper/card-orange.png')}
            imageStyle={{borderRadius: theme.border}}
            style={style1.imageCard}>
              {flip ? 
                <View style={{alignItems: 'center'}}>
                  <View style={{display: 'flex', flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{padding: 10}}
                      onPress={playSound}>
                      <Ionicons name="volume-medium-outline" size={26} color ="tomato" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, marginRight: 10}}> {item.chinese}</Text>
                  </View>
                  <Text style={{color: 'grey', letterSpacing: 3}}>第{item.id}个</Text>

                  <TouchableOpacity
                    style={{alignItems: 'center', padding: 10}}
                    onPress={addMark}>
                    {foundItem ? 
                      <Ionicons name="bookmark" size={24} color="gold" /> :
                      <Ionicons name="bookmark-outline" size={20} color="grey" />
                    }
                  </TouchableOpacity>

                </View> : 

                <View style={{alignItems: 'center'}}>
                  <Text style={{fontStyle: 'italic'}}>{item.latin}</Text>
                  <View style={{height: 3}}></View>
                  <Text>{item.family} {item.category}</Text>
                  <Text>{item.definition}</Text>
                </View>
              }
          </ImageBackground> 
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <View style={{alignItems: 'center'}}>
      <View style={{height: 230}}>
        <FlatList 
          ref={flatListRef}
          initialNumToRender={numRender}
          onViewableItemsChanged={onViewableChange}
          viewabilityConfig={viewabilityConfig}
          onScrollToIndexFailed={({index,averageItemLength}) => {
            const wait = new Promise(resolve => setTimeout(resolve, 1000));
            wait.then(() => {flatListRef.current?.scrollToIndex({index: index})})
          }}
          data={props.data} 
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={style1.buttonLine}>
        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>jumpForward(-10)}>
          <FontAwesome name="backward" size={35} color="#ff8e38" />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>jumpForward(-1)} style={{padding:5}}>
          <Ionicons name="caret-back" size={50} color="#ff8e38" />
          </TouchableOpacity>
        </View>

        <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={()=>jumpForward(1)} style={{padding:5}}>
          <Ionicons name="caret-forward" size={50} color="#ff8e38" />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>jumpForward(10)}>
          <FontAwesome name="forward" size={35} color="#ff8e38" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const style1 = StyleSheet.create({
  buttonLine: {
    width: theme.authWidth-10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageCard: {
    height: 200,
    borderRadius: theme.border,
    width: theme.width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.4,
  }
})