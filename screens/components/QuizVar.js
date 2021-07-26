import React from 'react';
import { Button, Text, View, StyleSheet, FlatList, Image, ImageBackground, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quiz1 from '../data/quiz1.json';
import quiz2 from '../data/quiz2.json';



const { width, height } = Dimensions.get('screen');

export const QuizVar = ({route, navigation}) => {
  const raw_quiz1 = quiz1.Sheet1.sort(() => Math.random()-0.5).filter((val, index) => index < 10);
  const final_quiz1 = raw_quiz1.map((val, index) => ({
  problem: val.problem,
  answer: val[val.answer.substring(0,1)],
  answerArr: [val.A, val.B, val.C, val.D].sort(() => Math.random()-0.5)
  }))
  var quizset;
  if(route.params.id === 1){
    quizset = final_quiz1;
  } else{
    quizset = quiz2;
  }
  const [quizData, setQuiz] = React.useState(quizset);
  const [numDone, setNumDone] = React.useState(0);
  console.log(numDone);

  const renderItem = ({item}) => {
    let answerArr = item.answerArr;

    const checkAnswer = (str) => {
      if(str === item.answer){
        console.log('答对了');
      } else {
        console.log('错，应该', item.answer);
      }
      setNumDone(numDone + 1);
    }

    return(
      <View style={{width, height: 600, alignItems: 'center'}}>
        <ImageBackground
            source={require('../../assets/images/quiz-frame6.png')}
            imageStyle={{borderRadius: theme.border, resizeMode: 'stretch'}}
            style={styles.quizCard}>
              <Text
                style={{fontSize: 17, marginBottom: 10}}>
                {item.problem}? 
              </Text>
              <TouchableOpacity style={styles.answerLine} onPress={() => checkAnswer(answerArr[0])}>
                <Text>A: {answerArr[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerLine} onPress={() => checkAnswer(answerArr[1])}>
                <Text>B: {answerArr[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerLine} onPress={() => checkAnswer(answerArr[2])}>
                <Text>C: {answerArr[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.answerLine} onPress={() => checkAnswer(answerArr[3])}>
                <Text>D: {answerArr[3]}</Text>
              </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }

  return(
    <View style={{backgroundColor: 'white', flex: 1}}>
      
      <View style={{paddingTop: theme.marginTop, left: 30}}>
        <TouchableOpacity 
          onPress={()=>navigation.goBack()}>
            <Ionicons name='arrow-back' size={20} color='grey'/>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 30}}>
          {route.params.id === 1 ? '园林树木拉丁名测试题' : '园林花卉拉丁名测试题'}
        </Text>
        <FlatList 
          data={quizData} 
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        
      </View>
    </View> 
  )
}


const styles = StyleSheet.create({
  quizCard: {
    marginTop: 10,
    height: 500,
    width: theme.width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.4,
    paddingBottom: 40,
  },
  answerLine: {
    width: 200,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    borderWidth: 0.5,
    justifyContent: 'center',
    marginTop: 15
  },


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