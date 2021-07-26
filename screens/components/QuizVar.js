import React from 'react';
import { Button, Text, View, StyleSheet, FlatList, Image, ImageBackground, Dimensions, Modal } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../../assets/styles'
import Card from './CardUnit'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import quiz1 from '../data/quiz1.json';
import quiz2 from '../data/quiz2.json';
import ProgressBar from './ProgressBar';

const { width, height } = Dimensions.get('screen');

export const QuizVar = ({route, navigation}) => {
  // === 随机取10道题 ===
  const raw_quiz1 = quiz1.Sheet1.sort(() => Math.random()-0.5).filter((val, index) => index < 10);
  const final_quiz1 = raw_quiz1.map((val, index) => ({
    question: val.problem,
    answer: val[val.answer.substring(0,1)],
    answerArr: [val.A, val.B, val.C, val.D].sort(() => Math.random()-0.5)
  }))
  const raw_quiz2 = quiz2.Sheet1.sort(() => Math.random()-0.5).filter((val, index) => index < 10);
  const final_quiz2 = raw_quiz2.map((val, index) => ({
    question: val.problem,
    answer: val[val.answer.substring(0,1)],
    answerArr: [val.A, val.B, val.C, val.D].sort(() => Math.random()-0.5)
  }))
  var quizset;
  if(route.params.id === 1){
    quizset = final_quiz1;
  } else{
    quizset = final_quiz2;
  }
  // === 定义quiz set结束 ===

  const [quizData, setQuiz] = React.useState(quizset);
  const [numDone, setNumDone] = React.useState(0);
  const [progressArr, setProgress] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);


  console.log('progressArr', progressArr);

  // Working: renderItem
  const renderItem = ({item, index}) => {

    var foundItem = progressArr.find((val) => val.id === index);

    var buttonList = item.answerArr.map((val, i) => (
      <TouchableOpacity 
       style={style1.button}
        onPress={() => checkAnswer(item.answerArr[i])}
        key={i}
      >
        <Text>{(i+10).toString(36).toUpperCase()}.  {item.answerArr[i]}</Text>
      </TouchableOpacity>
    ));

    if(foundItem){
      buttonList = item.answerArr.map((val, i) => (
        <TouchableOpacity 
          style={
            val===foundItem.correct ? style1.buttonGreen : 
            val===foundItem.select ? style1.buttonRed : style1.button}
          onPress={() => checkAnswer(item.answerArr[i])}
          key={i}
        >
          <Text>{(i+10).toString(36).toUpperCase()}.  {item.answerArr[i]}</Text>
        </TouchableOpacity>
      ));
    }

    const checkAnswer = (str) => {
      if(!foundItem){
        setProgress([...progressArr, {
          id: index,
          select: str, 
          correct: item.answer
        }]);
        setNumDone(numDone+1);
        if(numDone+1 === 10){
          setModalVisible(true);
        }
      }
    }

    // Done: 单张 render quiz 
    return(
      <View style={{width, height: 600, alignItems: 'center'}}>
        

        <ImageBackground
          source={require('../../assets/images/quiz-frame6.png')}
          imageStyle={{borderRadius: theme.border, resizeMode: 'stretch'}}
          style={styles.quizCard}
        >
          
          <Text style={{fontSize: 17, marginBottom: 10, maxWidth: 230}}>题{index+1}：{item.question}？ </Text>
          {buttonList}

        </ImageBackground>
      </View>
    )
  }

  // Done: 总页面 quiz
  return(
    <View style={{backgroundColor: 'white', flex: 1}}>
      
      <View style={{paddingTop: theme.marginTop, left: 30}}>
        <TouchableOpacity 
          onPress={()=>navigation.goBack()}>
            <Ionicons name='arrow-back' size={20} color='grey'/>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 10}}>
          {route.params.id === 1 ? '园林树木拉丁名测试题' : '园林花卉拉丁名测试题'}
        </Text>

        <Text style={{fontSize: 13, opacity: 0.7, marginBottom: 5}}>已完成 {numDone}/10 题</Text>
        <ProgressBar progress={numDone/10}/>

        <FlatList 
          data={quizData} 
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

{/* Todo: modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback 
            style={{height, width, alignItems: 'center', paddingTop: 120}}
            onPress={() => setModalVisible(false)}>
            <TouchableWithoutFeedback style={styles.modal}>
              <View style={{width, height, top: 20}}>
                
                <Text>恭喜，得分{progressArr.filter((val)=>val.correct===val.select).length*10}分</Text>
              </View>
              

            </TouchableWithoutFeedback>
          </TouchableWithoutFeedback>

        </Modal>
        
      </View>
    </View> 
  )
}

const style1 = StyleSheet.create({
  button: {
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
  buttonRed: {
    backgroundColor: '#ffd1d1',
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
  buttonGreen: {
    backgroundColor: '#d6ffe0',
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

})


const styles = StyleSheet.create({
  quizCard: {
    marginTop: 20,
    height: 500,
    width: theme.width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.4,
    paddingBottom: 40,
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