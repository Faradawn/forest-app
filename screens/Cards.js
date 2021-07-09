import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import CardSet from './components/CardSet'
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator();

function CardsList({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <Text style={styles.oneText}>我的单词们</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>


      <TouchableOpacity onPress={() => navigation.navigate('CardSet1')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}>
            <Text> 园林树木拉丁名150个 </Text>
        </ImageBackground> 
      </TouchableOpacity>

      <View style={{height:30}}/>

      <TouchableOpacity onPress={() => navigation.navigate('CardSet2')} >
        <ImageBackground
          source={require('../assets/wallpaper/card-slim.png')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}>
            <Text> 园林花卉拉丁名200个 </Text>
        </ImageBackground> 
      </TouchableOpacity>

    </View>
  )
}

 
export default function Cards() {  
  return(
    <Stack.Navigator>
      <Stack.Screen name='CardsList' component={CardsList} options={{headerShown: false}}/>
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