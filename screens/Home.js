import * as React from 'react'
import { Button, Text, View, Image} from 'react-native'
import { TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import ProgressBar from './components/ProgressBar'
import { buildArray, getProgress } from './api/API'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'
const Stack = createStackNavigator();


function HomePage({ navigation }) {
  const [fraction1, setFraction1] = React.useState(0)
  const [fraction2, setFraction2] = React.useState(0)

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
    <View style={styles.homePage}>
      <TouchableOpacity style={styles.homeCard} onPress={() => navigation.navigate('Quote')}>
        <Text>一曲未终 已被</Text>
        <Image 
          source={require('../assets/latinapp_raw_assets/3_wallpaper/1.jpg')}
          style={{resizeMode: 'contain', width: 300, height: 200}}/>
      </TouchableOpacity>


      <TouchableHighlight onPress={() => getFraction()}>
        <Text>刷新</Text>
      </TouchableHighlight>
      <View style={{height: 50}}></View>
      <View>
        <Text>园林树木拉丁名150个</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={fraction1}/>
        <View style={{height: 50}}></View>

        <Text>园林花卉拉丁名200个</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={fraction2}/>
        
        
      </View>
      
      
    </View>
  )
}
function Quote() {
  return(
    <View>
      <Text> 一曲未终，已被弃于四季</Text>
    </View>
  )
}

export default function Home() {  
  return(
    <Stack.Navigator initialRouteName='HomePage'>
      <Stack.Screen name='HomePage' component={HomePage}/>
      <Stack.Screen name='Quote' component={Quote}/>
    </Stack.Navigator>

  )
}

