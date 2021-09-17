import * as React from 'react'
import { Text, View, StyleSheet, ImageBackground, Dimensions, Modal, ScrollView, TouchableOpacity} from 'react-native'
import {WebView} from 'react-native-webview'
import styles, {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setQuizDone, setWordDone1, setWordDone2 } from './store/store';
import { Ionicons } from '@expo/vector-icons';
import PrivacyText from './data/PrivacyText';

const { width, height } = Dimensions.get('screen');

const Stack = createStackNavigator();

function SettingPage({ navigation }) {
  const [firstTime, setFirstTime] = React.useState(false)
  const [modal1, setModal1] = React.useState(false)
  const [modal2, setModal2] = React.useState(false)
  const dispatch = useDispatch();
  async function logOut(){
    try{
      await AsyncStorage.setItem('guest-token', '');
      dispatch(setUser('',''));
    } catch (e) {
      console.log(e);
    }
  }
  function handleOpen(num){
    if(num === 1){
      
    }

  }

  return (
    <ImageBackground style={style1.settingPage} source={require('../assets/wallpaper/bg-setting.png')}>

      <TouchableOpacity
        style={style1.button}
        onPress={()=>navigation.navigate('关于我们')}>
        <Text>关于我们</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={style1.button}
        onPress={()=>navigation.navigate('通用')}>
        <Text>通用</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={style1.button}
        onPress={logOut}>
        <Text>退出登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={style1.button}
        onPress={()=>setFirstTime(true)}>
        <Text>协议和隐私政策</Text>
        </TouchableOpacity>

        <Modal
        animationType="slide"
        transparent={true}
        visible={modal1}
        onRequestClose={() => setModal1(false)}>
          <View style={{height, width, alignItems: 'center'}}>
          <View style={style1.modalPri}>
            <TouchableOpacity
            style={{marginTop: 10, marginLeft: -10, marginBottom: 10}}
            onPress={()=>setModal1(false)}>
            <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>

            <PrivacyText/>

          </View>
          </View>
        </Modal>



        <Modal
        animationType="slide"
        transparent={true}
        visible={firstTime}
        onRequestClose={() => setFirstTime(false)}
      >
        <View style={{height, width, marginTop: 40, alignItems: 'center'}}>
        <View style={style1.modal}>
          <View style={style1.view1}>

<Text
style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>
服务协议和隐私政策
</Text>

<Text>

请你务必审慎阅读、充分理解“服务协议"和”隐私政策“各条款，包括但不限于：
为了向你提供定制化的服务，我们可能需要收集你的昵称。你可以在“设置”中查看、变更、删除个人信息并管理你的授权。你可阅读
<Text style={{color: 'blue'}} onPress={()=>setModal1(true)}>《服务协议》</Text> 和
<Text>《隐私政策》</Text>
了解详细信息。如你同意，请点击“同意”开始接受我们的服务。

</Text>   
            
          </View>
 
          <View style={style1.view2}>
          <TouchableOpacity style={style1.buttonOne} onPress={()=>setFirstTime(false)}>
          <Text>关闭</Text>
          </TouchableOpacity>
          
          </View>
          

        </View>
        </View>
      </Modal>
      
    </ImageBackground>

  )
}
function About() {
  return(
    <View style={styles.homePage}>
<Text style={style1.text}>
这个是一套 {'\n'}
园林植物拉丁学名单词记忆卡 {'\n'}
帮助风景园林、园林、观赏园艺专业的朋友； {'\n'}
北林考研得力助手， {'\n'}
唯愿帮你渡过 “拉丁之河”，{'\n'}
早日上岸，修成正果！{'\n'}
祝度过愉快的一天！
</Text>
    </View>
  )
}

function General() {
  const dispatch = useDispatch();

  async function logOut(){
    try{
      await AsyncStorage.setItem('guest-token', '');
      dispatch(setUser('',''));
    } catch (e) {
      console.log(e);
    }
  }
  return(
    <View style={styles.homePage}>
      <TouchableOpacity
        onPress={() => AsyncStorage.setItem('collection', '')}
        style={{marginBottom: 30}}
      />
      
      <TouchableOpacity 
        title='清空单词进度'
        style={style1.button}
        onPress={() => {
          AsyncStorage.setItem('mylist1', '');
          AsyncStorage.setItem('mylist2', '');
          dispatch(setWordDone1(0));
          dispatch(setWordDone2(0));
        }}>
        <Text>清空单词进度</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        title='清空做题进度'
        onPress={() => {
          AsyncStorage.setItem('quizDone', '');
          dispatch(setQuizDone([]));
        }}
        style={style1.button}>
        <Text>清空做题进度</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logOut}
        style={style1.button}>
        <Text>更改昵称</Text>
      </TouchableOpacity>
     

    </View>
  )
}

export default function Settings() {  
  return(
    <Stack.Navigator initialRouteName='SettingPage'>
      <Stack.Screen name='设置' component={SettingPage}/>
      <Stack.Screen name='关于我们' component={About}/>
      <Stack.Screen name='通用' component={General}/>
    </Stack.Navigator>

  )
}

const style1 = StyleSheet.create({
  modalPri: {
    backgroundColor: 'white',
    height: height,
    width: width,
    paddingHorizontal: 30,
    borderRadius: theme.border,
  },
  text1:{
    fontSize: 15,
    marginTop: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  view1:{
    height: 450,
    padding: 30,
    width: width < 600 ? theme.width-70 : theme.width-220,
    paddingHorizontal: 10,
  },
  view2:{
    marginTop: 20
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: width < 600 ? 600 : 800,
    width: width < 600 ? theme.width-50 : theme.width-200,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
    paddingBottom: 40,
    borderRadius: theme.border,
    elevation: 10
  },
  buttonOne: {
    width: 90,
    height: 30,
    marginTop: 15,
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },



  text: {
    lineHeight: 30,
  },
  settingPage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    flex: 1,
  },
  button: {
    width: 200,
    height: 50,
    marginTop: 20,
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})