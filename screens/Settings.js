import * as React from 'react'
import { Button, Text, View, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../assets/styles'

import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Stack = createStackNavigator();


function SettingPage({ navigation }) {
  return (
    <View style={styles.homePage}>
      <Button title='关于' onPress={() => navigation.navigate('关于我们')}></Button>
      <Button 
        title='清除所有进度和星标'
        onPress={() => AsyncStorage.clear()}/>
      
    </View>
  )
}
function General() {
  return(
    <View style={styles.homePage}>
      <Text>这个是一套 {'\n'}
园林植物拉丁学名单词记忆卡 {'\n'}
帮助风景园林、园林、观赏园艺专业的小朋友，快速背学名 {'\n'}
是北林考研的最佳伴侣 {'\n'}
唯愿帮你渡过 “拉丁之河”，早日上岸，修成正果！{'\n'}
内置：{'\n'}
【园林树木拉丁学名150个】{'\n'}
【园林花卉拉丁学名200个】{'\n'}
欢迎任何意见或建议，祝度过愉快的一天！
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