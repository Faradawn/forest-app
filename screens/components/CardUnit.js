import * as React from 'react'
import { FlatList, Text, View, StyleSheet, ImageBackground, Dimensions } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import styles, {theme} from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { switchSound } from '../api/switchSound';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('screen');

/**
 * Form for user login
 * @param {object} props Component props
 * @param {array} props.data Wordset data
 * @param {number} props.wordset_id Wordset number
 */
export default function Card(props) {
  const [flip, setFlip] = React.useState(true);
  const [arr, setArr] = React.useState([]);
  var data = props.data;
  if(!data){
    data = {id: "0", chinese: "加载中", latin: "", category: "", family: ""};
  }
  const loadAsync = async () => {
    try{
      if(arr.length === 0){
        let retrieved = await AsyncStorage.getItem('collection');
        if(retrieved){
          setArr(JSON.parse(retrieved));
          console.log('loaded wordset in card',props.wordset_id);
        }
      }
    } catch(e){
      console.log(e)
    }
  }
  React.useEffect(() => {
    setTimeout(loadAsync, 500)
  },[])

  
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
    <FlatList 
      data={data} 
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />

  )
}


const style1 = StyleSheet.create({
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