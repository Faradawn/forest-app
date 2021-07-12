import * as React from 'react'
import { Button, Text, View, Image, StyleSheet, Dimensions, ImageBackground} from 'react-native'
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import ProgressBar from './components/ProgressBar'
import { buildArray, getProgress } from './api/API'
import { HomeQuote } from './components/HomeQuote'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function HomePage({ navigation }) {
  const [fraction1, setFraction1] = React.useState(0)
  const [fraction2, setFraction2] = React.useState(0)
  var username = useSelector(state => state.user.name);

  async function getFraction() {
    // can change to multiget()
    const value1 = await getProgress('@wordset1') 
    const value2 = await getProgress('@wordset2')
    const obj1 = JSON.parse(value1)
    const obj2 = JSON.parse(value2)
    if(obj1) {setFraction1(obj1.progress/obj1.totalLength)}
    else {setFraction1(0)}
    if(obj2) {setFraction2(obj2.progress/obj2.totalLength)}
    else {setFraction2(0)}
  }

  React.useEffect(() => {getFraction()})

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../assets/wallpaper/bg-1.png')}
    >
      <View style={styles.oneLine}>
        <Text style={styles.oneText}>嘿，{username}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('MyCollections')}>
        <MaterialCommunityIcons name="notebook" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <HomeQuote/>

      <View style={{height: 50}}></View>
      <View>
        <Text>园林树木拉丁名150个</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={fraction1}/>
        <View style={{height: 50}}></View>

        <Text>园林花卉拉丁名200个</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={fraction2}/>

        <View style={{height: 90}}></View>
        <TouchableOpacity style={{alignItems:'center'}}onPress={() => getFraction()}>
          <View style={{height: 230, width: 130, }}></View>
        </TouchableOpacity>

        
      </View>
    </ImageBackground>
  )
}

const Stack = createStackNavigator();
export default function Home() {  
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomePage} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
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
})