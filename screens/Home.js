import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles'
import ProgressBar from './components/ProgressBar'
import { HomeQuote } from './components/HomeQuote'
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import greeting1 from './data/greeting1.json';

export default function Home() {
  var username = useSelector(state => state.user.name);
  var username2 = username === '朋友' ? '我' : username;
  
  var arr1 = useSelector(state => state.quizDone);
  var temp1 = arr1.filter(v => v/10000 < 2).length/150;
  var temp2 = arr1.filter(v => v/10000 >= 2).length/199;
  if(temp1 > 1){
    temp1 = 1;
  }
  if(temp2 > 1){
    temp2 = 1;
  }

  var greetings = greeting1.Sheet1;
  var day = new Date().getDay();
  var vIndex = Math.floor((day/31) * greetings.length);
  const [v, setV] = React.useState(vIndex);

  React.useEffect(()=>{
    vIndex = Math.floor(((new Date().getDay())/31) * greetings.length);
    setV(vIndex);
  },[day])

  return (
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <Text style={styles.oneText}>{greetings[v].sentence}，{username}</Text>
        <TouchableOpacity onPress={() => {
          setV(Math.floor(Math.random()*greetings.length))
          
          }}>
        <Feather name="sun" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <HomeQuote/>

      <View style={{marginTop: 40}}>
        <Text style={{marginBottom: 30, letterSpacing: 5, fontSize: 17, textAlign: 'center'}}>「我的进度」</Text>
        <Text>园林树木150题</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={temp1}/>
        <View style={{height: 50}}></View>

        <Text>园林花卉200题</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={temp2}/>

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