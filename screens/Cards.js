import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { VocabCollection } from './components/CardSet';
import { Ionicons } from '@expo/vector-icons';
import { CardSetVar } from './components/CardSet'
const Stack = createStackNavigator();



export const MyCollections = ({ navigation }) => {
  const CollectionsRoot = () => {
    return(
      <View style={styles.container}>
        <View style={styles.oneLine}>
          <Text style={styles.oneText}>我的收藏</Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('VocabCollection')} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 我的单词本 </Text>
          </ImageBackground> 
        </TouchableOpacity>
      </View>
    )
  }

  return(
    <Stack.Navigator>
      <Stack.Screen name='CollectionsRoot' component={CollectionsRoot} options={{headerShown: false}}/>
      <Stack.Screen name='VocabCollection' component={VocabCollection} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}
// end of 收藏
 
export const Cards = () => {  
  const [order, setOrder] = React.useState(true);

  const  CardsList = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.oneLine}>
          <Text style={styles.oneText}>我的单词们</Text>
          <TouchableOpacity onPress={()=>setOrder(!order)}>
            <Ionicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>


        {order ? 
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('CardSetVar', {id: 1})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 园林树木拉丁名150个 </Text>
          </ImageBackground> 
        </TouchableOpacity>
  
        <View style={{height:30}}/>
  
        <TouchableOpacity onPress={() => navigation.navigate('CardSetVar', {id: 2})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 园林花卉拉丁名200个 </Text>
          </ImageBackground> 
        </TouchableOpacity>
        </View>
        : 
        <View>
      <TouchableOpacity onPress={() => navigation.navigate('CardSet2', {id: 2})} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}>
            <Text> 园林花卉拉丁名200个 </Text>
        </ImageBackground> 
      </TouchableOpacity>
      <View style={{height:30}}/>
      <TouchableOpacity onPress={() => navigation.navigate('CardSet1'), {id: 1}} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}>
            <Text> 园林树木拉丁名150个 </Text>
        </ImageBackground> 
      </TouchableOpacity>
      </View> }
      </View>
    )
  }


  return(
    <Stack.Navigator>
      <Stack.Screen name='CardsList' component={CardsList} options={{headerShown: false}}/>
      <Stack.Screen name='CardSetVar' component={CardSetVar} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
      
}

const styles = StyleSheet.create({
  // top
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

  // image card 
  imageCard: {
    height: 130,
    borderRadius: theme.border,
    width: theme.width+50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.4,
  }
})