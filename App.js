
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import store, { setUser, setLoading, setCloudErr } from './screens/store/store';
import { useSelector } from 'react-redux';
import AV from 'leancloud-storage/core';
import LeanCloudInit from './screens/api/LeanCloudInit'

import AuthRoot from './screens/AuthRoot'
import AppRoot from './screens/AppRoot';
import AsyncStorage from '@react-native-community/async-storage';
// 登陆最后7.03，别忘记leancloud init
// LeanCloudInit();

const RootStack = createStackNavigator();


export default function App() {

  const RootStackScreen = () => {
    var token = useSelector(state => state.user.token);
    var counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    React.useEffect(() => {
      setTimeout(async() => {
        dispatch(setLoading(true));
        let user = null;
        try {
          user = await AV.User.currentAsync();
          dispatch(setCloudErr(false));
          if(user){
            dispatch(setUser(user.getSessionToken(), user.getUsername()))
            dispatch(setLoading(false));
          }else{
            try{
              let localToken = await AsyncStorage.getItem('localToken');
            
              if(localToken){
                dispatch(setUser(localToken, 'guest'));
              }
            } catch (e) {
              console.log(e);
            }
            dispatch(setLoading(false));
          }
        } catch (e) {
          console.log('leancloud 问题', e);
          dispatch(setCloudErr(true));

          try{
            let localToken = await AsyncStorage.getItem('localToken');
            if(localToken){
              dispatch(setUser(localToken, 'guest'));
            }
          } catch (e) {
            console.log(e);
          }
          dispatch(setLoading(false));
        }
      }, 5000)
    }, [counter]);
  
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

