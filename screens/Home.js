import * as React from 'react'
import { Button, Text, View, Image, StyleSheet, Dimensions, ImageBackground, Modal} from 'react-native'
import { TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { theme } from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import ProgressBar from './components/ProgressBar'
import { buildArray, getProgress } from './api/API'
import { HomeQuote } from './components/HomeQuote'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { MyCollections } from './components/MyCollections'

const {height, width} = Dimensions.get('screen');

function HomePage({ navigation }) {
  const [fraction1, setFraction1] = React.useState(0)
  const [fraction2, setFraction2] = React.useState(0)
  const [modalVisible, setModalVisible] = React.useState(false);
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
    <View style={styles.container}>
      <View style={styles.oneLine}>
        <Text style={styles.oneText}>嘿，{username}</Text>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
        <MaterialCommunityIcons name="notebook" size={24} color="black" />
        </TouchableOpacity>
      </View>

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
              <MyCollections/>
            </View>
            

          </TouchableWithoutFeedback>

        </TouchableWithoutFeedback>

      </Modal>

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

const Stack = createStackNavigator();
export default function Home() {  
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomePage} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
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