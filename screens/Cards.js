import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CardSetVar } from './components/CardSetVar';
import { QuizVar } from './components/QuizVar';
const Stack = createStackNavigator();

const Cards = () => {  

  const  CardsList = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <View style={styles.oneLine}>
          <Text style={styles.oneText}>我的学习场</Text>
          {/* TODO: 改成bookmark */}
          <TouchableOpacity onPress={() => {}}>
          <MaterialCommunityIcons name="notebook-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={() => navigation.navigate('CardSet1', {id: 1})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 园林树木拉丁名150个 </Text>
          </ImageBackground> 
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => navigation.navigate('CardSet2', {id: 2})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 园林花卉拉丁名200个 </Text>
          </ImageBackground> 
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Quiz1', {id: 1})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 「十道题」 园林树木拉丁名 </Text>
          </ImageBackground> 
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Quiz2', {id: 2})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 「十道题」 园林花卉拉丁名 </Text>
          </ImageBackground> 
        </TouchableOpacity>

        </View>
        
      </View>
    )
  }


  return(
    <Stack.Navigator>
      <Stack.Screen name='CardsList' component={CardsList} options={{headerShown: false}}/>
      <Stack.Screen name='CardSetVar' component={CardSetVar} options={{headerShown: false}}/>
      <Stack.Screen name='QuizVar' component={QuizVar} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
      
}

export default Cards;

const styles = StyleSheet.create({
  // modal
 
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