import React from 'react';
import { Button, Text, View, StyleSheet, FlatList, Image, ImageBackground, Dimensions, Modal, TouchableOpacity } from 'react-native'
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';
import quiz1 from '../data/quiz1.json';
import quiz2 from '../data/quiz2.json';
import wordset1 from '../data/wordset1.json';
import wordset2 from '../data/wordset2.json';
import ProgressBar from './ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector,useDispatch } from 'react-redux';
import { setQuizDone } from '../store/store';

const { width, height } = Dimensions.get('screen');

export const QuizVar = ({route, navigation}) => {
  // Done: === 随机取10道题 ===
  const raw_quiz1 = quiz1.Sheet1.sort(() => Math.random()-0.5).filter((val, index) => index < 10);
  const final_quiz1 = raw_quiz1.map((val, index) => ({
    id: 10000 + parseInt(val.id),
    quizset: 1,
    question: val.problem,
    answer: val[val.answer.substring(0,1)],
    answerArr: [val.A, val.B, val.C, val.D].sort(() => Math.random()-0.5)
  }))
  const raw_quiz2 = quiz2.Sheet1.sort(() => Math.random()-0.5).filter((val, index) => index < 10);
  const final_quiz2 = raw_quiz2.map((val, index) => ({
    id: 20000 + parseInt(val.id),
    quizset: 2,
    question: val.questions,
    answer: val[val.answer.substring(0,1)],
    answerArr: [val.A, val.B, val.C, val.D].sort(() => Math.random()-0.5)
  }))
  var quizset, wordset;
  if(route.params.id === 1){
    quizset = final_quiz1;
    wordset = wordset1.Sheet1;
  } else{
    quizset = final_quiz2;
    wordset = wordset2.Sheet1;
  }
  const [quizData, setQuiz] = React.useState(quizset);
  const [progressArr, setProgress] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [arr, setArr] = React.useState([]);
  const [doneQuiz, setDoneQuiz] = React.useState([]);
  const flatListRef = React.useRef(null);
  var username = useSelector(state => state.user.name);
  var dispatch = useDispatch();
  
  const loadAsync = async () => {
    try{
      let retrieved = await AsyncStorage.getItem('collection');
      let quizDone = await AsyncStorage.getItem('quizDone');
      if(retrieved){
        setArr(JSON.parse(retrieved));
      }
      if(quizDone){
        setDoneQuiz(JSON.parse(quizDone));
      }
    } catch(e){
      console.log(e)
    }
  }
  React.useEffect(() => {
    setTimeout(loadAsync, 500)
  },[])
  

  // Done: renderItem
  const renderItem = ({item, index}) => {
    var foundAnswer = progressArr.find((val) => val.id === index);
    var buttonList = item.answerArr.map((val, i) => (
      <TouchableOpacity 
       style={style1.button}
        onPress={() => checkAnswer(item.answerArr[i])}
        key={i}
      >
        <Text>{(i+10).toString(36).toUpperCase()}.  {item.answerArr[i]}</Text>
      </TouchableOpacity>
    ));

    if(foundAnswer){
      buttonList = item.answerArr.map((val, i) => (
        <TouchableOpacity 
          style={
            val===foundAnswer.correct ? style1.buttonGreen : 
            val===foundAnswer.select ? style1.buttonRed : style1.button}
          onPress={() => checkAnswer(item.answerArr[i])}
          key={i}
        >
          <Text>{(i+10).toString(36).toUpperCase()}.  {item.answerArr[i]}</Text>
        </TouchableOpacity>
      ));
    }

    var firstHalf = item.question.split('的')[0];
    var secondHalf = item.question.split('的')[1];
    var foundWord = wordset.find(val => val.chinese === firstHalf);
    var foundMark = arr.find(val => val.id%(route.params.id*10000) === parseInt(foundWord.id));
    
    

    const checkAnswer = (str) => {
      
      if(!foundAnswer){
        setProgress([...progressArr, {
          id: index,
          select: str, 
          correct: item.answer
        }]);
        // TODO:
        if(progressArr.length+1 === 10){
          let thisArr = [];
          quizData.map(val => {
            thisArr.push(val.id);
          })
          let mergeArr = [...doneQuiz, ...thisArr.filter((v) => doneQuiz.indexOf(v) === -1)];
          AsyncStorage.setItem('quizDone', JSON.stringify(mergeArr));
          dispatch(setQuizDone(mergeArr));
          setTimeout(()=>setModalVisible(true), 500)
        }

        setTimeout(()=>{
          if (flatListRef.current && progressArr.length <= 8)
            flatListRef.current.scrollToIndex({index: progressArr.length+1})
        }, 300)

      }
    }

    const addUnderline = async () => {
      let newId = (parseInt(foundWord.id) + route.params.id*10000).toString();
      if(!foundMark){
        setArr([...arr, {id: newId, date: (new Date()).getTime(), wordset: route.params.id, info: foundWord}]);
        await AsyncStorage.setItem('collection', JSON.stringify(
          [...arr, {id: newId, date: (new Date()).getTime(), wordset: route.params.id, info: foundWord}]
        ))
      }
      else{
        setArr(arr.filter(val => val.id%(route.params.id*10000) !== parseInt(foundWord.id)));
        await AsyncStorage.setItem('collection', JSON.stringify(
          arr.filter(val => val.id%(route.params.id*10000) !== parseInt(foundWord.id))
        ))
      }
    }

    const RenderUnderline = () => {
      if(foundWord){
        if(foundMark){
          return <Text style={{textDecorationLine: 'underline', color: '#d1a300', fontWeight: 'bold'}} onPress={addUnderline}>{firstHalf}</Text>
        } else {
          return <Text style={{textDecorationLine: 'underline'}} onPress={addUnderline}>{firstHalf}</Text>
        }
      } else {
        return <Text>{firstHalf}</Text>
      }
    }

    // Done: 单张 render quiz 
    return(
      <View style={{width, height: width < 600 ? 600 : 900, alignItems: 'center'}}>
        <ImageBackground
          source={require('../../assets/images/quiz-frame-final.png')}
          imageStyle={{borderRadius: theme.border, resizeMode: 'stretch'}}
          style={styles.quizCard}
        >
          <View style={{alignItems:'flex-end', paddingRight: 30, marginTop: 10}}>
            <TouchableOpacity
              onPress={addUnderline}>
              {foundMark ? <Ionicons name="bookmark" size={24} color="gold" />
              : <Ionicons name="bookmark-outline" size={24} color="grey" />}
            </TouchableOpacity>
          </View>

          <View style={{alignItems: 'center', marginTop: 50}}>
            <Text style={{fontSize: 17, marginBottom: 10, marginLeft: 10, maxWidth: 230}}>
              题{index+1}：
              <RenderUnderline/> 的
              <Text>{secondHalf}</Text>?
            </Text>
            {buttonList}
          </View>

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
        {/* <Button title='toggle modal' onPress={()=>setModalVisible(!modalVisible)}/> */}

        <Text style={{fontSize: 13, opacity: 0.7, marginBottom: 5}}>已完成 {progressArr.length}/10 题</Text>
        <ProgressBar progress={progressArr.length/10}/>

        <FlatList 
          ref={flatListRef}
          data={quizData} 
          renderItem={renderItem}
          keyExtractor={item => item.question}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{height, width, marginTop: 130, alignItems: 'center'}}>
          <View style={styles.modal}>

            <TouchableOpacity
                style={{marginTop: 15, marginLeft: 15}}
                onPress={()=>setModalVisible(false)}>
                <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
              <ImageBackground
                source={require('../../assets/images/quiz-score.png')}
                imageStyle={{borderRadius: theme.border, resizeMode: 'stretch'}}
                style={styles.scoreCard}
              >
                <View>

                  <Text style={{textAlign: 'center', lineHeight: 20, letterSpacing: 3, marginTop: 110}}
                    > 恭喜{username}{'\n'} 得分 {progressArr.filter((val)=>val.correct===val.select).length*10} 分!
                  </Text>

                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={style1.signupButton} onPress={()=>{
                      setModalVisible(false);
                      navigation.goBack();
                    }}>
                    <Text>完成</Text>
                    </TouchableOpacity>

                  </View>
                </View>

              </ImageBackground>
            </View>
            
          </View>
          </View>
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
  signupButton: {
    width: 70,
    height: 30,
    marginTop: 10,
    borderColor: 'orange',
    backgroundColor: '#fffff7',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {

  },

})
const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    marginTop: 20,
    height: width < 600 ? 500 : 800,
    width: width < 600 ? theme.width : theme.width-200,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
    paddingBottom: 40,
    borderRadius: theme.border,
  },
  scoreCard: {
    height: 300,
    width: 300,
  },

  quizCard: {
    marginTop: 20,
    height: width < 600 ? 500 : 800,
    width: width < 600 ? theme.width : theme.width-200,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.4,
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