import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground} from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles, {theme} from '../assets/styles'

import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './api/context'


const Stack = createStackNavigator();


function SettingPage({ navigation }) {

  const { signOut } = React.useContext(AuthContext);

  return (
    <ImageBackground style={style1.settingPage} source={require('../assets/wallpaper/bg-setting.png')}>
      <Button title='关于' onPress={() => navigation.navigate('关于我们')}></Button>
      <View style={{height: 30}}/>
      <Button 
        title='清除进度和收藏'
        onPress={() => AsyncStorage.clear()}/>
      <View style={{height: 30}}/>

      <Button 
        title='退出登陆'
        onPress={() => signOut()}/>
    </ImageBackground>

  )
}
function General() {
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

export default function Home() {  
  return(
    <Stack.Navigator initialRouteName='SettingPage'>
      <Stack.Screen name='设置' component={SettingPage}/>
      <Stack.Screen name='关于我们' component={General}/>
    </Stack.Navigator>

  )
}

const style1 = StyleSheet.create({
  text: {
    lineHeight: 30,
  },
  settingPage: {
    paddingTop: 290,
    alignItems: 'center',
    flex: 1,
  },
  
})