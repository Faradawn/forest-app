import * as React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { switchSound } from '../api/switchSound';

export const MyCollection = () => {
  const [arr, setArr] = React.useState([]);
  const loadAsync = async () => {
    try{
      let retrieved = await AsyncStorage.getItem('collection');
      if(retrieved){
        setArr(JSON.parse(retrieved).reverse());
      }
    } catch(e){
      console.log(e)
    }
  }
  React.useEffect(() => {
    setTimeout(loadAsync, 500)
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

            <View style={item.wordset === 1 ? {marginLeft: 10, backgroundColor: '#fffd8f'} : {marginLeft: 10, backgroundColor: '#e0fffb'}}>
              <Text style={{fontSize: 13}}>{item.wordset === 1 ? '园林树木' : '园林花卉'}</Text>
            </View>


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