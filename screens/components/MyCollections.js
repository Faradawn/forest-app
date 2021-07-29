import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground, Image, Dimensions, Modal } from 'react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { VocabCollection } from './CardSet';
const {height, width} = Dimensions.get('screen');

const Stack = createStackNavigator();
export const MyCollections = () => {
  const CollectionsRoot = ({navigation}) => {
    return(
      <View style={{alignItems: 'center', backgroundColor: 'white', flex: 1}}>
        <Text >我的收藏</Text>  
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => navigation.navigate('VocabCollection')} >
            <Image
              source={require('../../assets/images/notebook1.png')}
              style={{width: 200, height: 200, resizeMode: 'stretch'}}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('VocabCollection')} >
            <Image
              source={require('../../assets/images/notebook1.png')}
              style={{width: 200, height: 200, resizeMode: 'stretch'}}/>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  return(
    <Stack.Navigator initialRouteName='CollectionsRoot'>
      <Stack.Screen name='CollectionsRoot' component={CollectionsRoot} options={{headerShown: false}}/>
      <Stack.Screen name='VocabCollection' component={VocabCollection} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  // modal
  modal: {
    width: width,
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 30,
    shadowOffset: {width: 5, height: 0},
    shadowRadius: 20,
    shadowOpacity: 0.4,
  },
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