import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground} from 'react-native'
import styles from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setQuizDone } from './store/store';



const Stack = createStackNavigator();


function SettingPage({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  async function logOut(){
    try{
      await AsyncStorage.setItem('guest-token', '');
      dispatch(setUser('',''));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ImageBackground style={style1.settingPage} source={require('../assets/wallpaper/bg-setting.png')}>
      <Button 
        title='关于'
        onPress={() => navigation.navigate('关于我们')}>
      </Button>
      <View style={{height: 10}}></View>
      <Button 
        title='通用'
        onPress={() => navigation.navigate('通用')}>
      </Button>
      <View style={{height: 10}}></View>
      <Button 
        title='退出登陆'
        onPress={logOut}/>
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
  return(
    <View style={styles.homePage}>
      <Button 
        title='清空单词本'
        onPress={() => AsyncStorage.setItem('collection', '')}
        style={{marginBottom: 30}}
      />
      <Button 
        title='清空做题进度'
        onPress={() => {
          AsyncStorage.setItem('quizDone', '');
          dispatch(setQuizDone([]));

        }}
        style={{marginBottom: 30}}
      />

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
  text: {
    lineHeight: 30,
  },
  settingPage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    flex: 1,
  },
  
})