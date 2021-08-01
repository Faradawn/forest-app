import * as React from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, Modal} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles'
import ProgressBar from './components/ProgressBar'
import { HomeQuote } from './components/HomeQuote'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';

const {height, width} = Dimensions.get('screen');

export default function Home() {
  const [fraction1, setFraction1] = React.useState(0)
  const [fraction2, setFraction2] = React.useState(0)
  const [v, setV] = React.useState(0);

  var username = useSelector(state => state.user.name);
  var greetings = ['今天咋样', '最近如何','心情好么','梦见了什么','饭否','路上还顺'];
  

  return (
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <Text style={styles.oneText}>{greetings[v]}，{username}</Text>
        <TouchableOpacity onPress={() => {
          setV(Math.floor(Math.random()*greetings.length))
          
          }}>
        <Feather name="sun" size={24} color="black" />
        </TouchableOpacity>
      </View>


      <HomeQuote/>

      <View style={{marginTop: 50}}>
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
    </View>
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
    width: theme.authWidth+20,
  },

  oneText:{
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30,
  },
})