import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import store, { setUser, setQuizDone, setWordDone1, setWordDone2 } from './screens/store/store';
import { useSelector } from 'react-redux';

import AuthRoot from './screens/AuthRoot'
import AppRoot from './screens/AppRoot';
import AsyncStorage from '@react-native-community/async-storage';

const RootStack = createStackNavigator();

export default function App() {

  const RootStackScreen = () => {
    var token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    React.useEffect(() => {
      setTimeout(async() => {
        try{
          let username = await AsyncStorage.getItem('guest-token');
          let quizDone = await AsyncStorage.getItem('quizDone');
          let wordDone1 = await AsyncStorage.getItem('mylist1');
          let wordDone2 = await AsyncStorage.getItem('mylist2');
          if(username){dispatch(setUser('guest-token', username))}
          if(quizDone){dispatch(setQuizDone(JSON.parse(quizDone)))}
          if(wordDone1){dispatch(setWordDone1(parseInt(wordDone1)))}
          if(wordDone2){dispatch(setWordDone2(parseInt(wordDone2)))}
          console.log('App.js 载入用户和进入完成')
        } catch (e) {
          console.log(e);
        } 
      }, 500)
    }, []);
  
    return (
      <RootStack.Navigator headerMode='none'>
        {token ? (
          <RootStack.Screen name='主页' component={AppRoot}/>
        ) : (
          <RootStack.Screen name='验证' component={AuthRoot}/>
        )}
      </RootStack.Navigator>
    )
  }
  
  return (

    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen/>
      </NavigationContainer>
    </Provider>

  



  );
}

