import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import store, { setUser, setLoading, setQuizDone } from './screens/store/store';
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
      console.log('初始化：载入用户名和进度');
      setTimeout(async() => {
        dispatch(setLoading(true));
        try{
          let username = await AsyncStorage.getItem('guest-token');
          let quizDone = await AsyncStorage.getItem('quizDone');
          if(username){
            dispatch(setUser('guest-token', username));
            console.log('Async用户名已载入selector');
          }
          if(quizDone){
            dispatch(setQuizDone(JSON.parse(quizDone)));
            console.log('Async进度已载入selector');
          }
        } catch (e) {
          console.log(e);
        } finally {
          dispatch(setLoading(false));
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

