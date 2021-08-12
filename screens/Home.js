import * as React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles'
import ProgressBar from './components/ProgressBar'
import { HomeQuote } from './components/HomeQuote'
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import greeting1 from './data/greeting1.json';

const {width, height} = Dimensions.get('screen');

export default function Home() {
  var username = useSelector(state => state.user.name);
  var arr1 = useSelector(state => state.quizDone);
  var wordFrac1 = useSelector(state => state.wordDone1)/150
  var wordFrac2 = useSelector(state => state.wordDone2)/199
  var quizFrac1 = arr1.filter(v => v/10000 < 2).length/150;
  var quizFrac2 = arr1.filter(v => v/10000 >= 2).length/199;
  if(quizFrac1 > 1){quizFrac1 = 1;}
  if(quizFrac2 > 1){quizFrac2 = 1;}
  if(wordFrac1 > 1){wordFrac1 = 1;}
  if(wordFrac2 > 1){wordFrac2 = 1;}

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

      <View style={width < 600 ? {marginTop: 30} : {marginTop: 60, width: width-400, alignItems: 'center'}}>
        <Text style={{marginBottom: 20, letterSpacing: 5, fontSize: 17, textAlign: 'center'}}>「单词进度」</Text>
        <Text>园林树木150单词</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={wordFrac1}/>
        <View style={{height: 20}}></View>

        <Text>园林花卉200单词</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={wordFrac2}/>
        <View style={width < 600 ? {height: 30} : {height: 60}}></View>

        <Text style={{marginBottom: 20, letterSpacing: 5, fontSize: 17, textAlign: 'center'}}>「学习进度」</Text>
        <Text>园林树木150题</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={quizFrac1}/>
        <View style={{height: 20}}></View>

        <Text>园林花卉200题</Text>
        <View style={{height: 10}}></View>
        <ProgressBar progress={quizFrac2}/>

        <View style={{height: 90}}></View>

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
    width: width < 600 ? theme.authWidth+20 : theme.authWidth-100,
  },

  oneText:{
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30,
  },
})