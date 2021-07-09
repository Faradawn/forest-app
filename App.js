import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch } from 'react-redux';
import store, { setUser, setLoading } from './screens/store/store';
import { useSelector } from 'react-redux';

import AuthRoot from './screens/AuthRoot'
import AppRoot from './screens/AppRoot';
import AsyncStorage from '@react-native-community/async-storage';

const RootStack = createStackNavigator();

console.log('outer code tiggerered');

export default function App() {

  const RootStackScreen = () => {
    var token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    console.log('app function tirggered');

    React.useEffect(() => {
      console.log('use effect triggered');
      setTimeout(async() => {
        dispatch(setLoading(true));
        try{
          let username = await AsyncStorage.getItem('guest-token');
          if(username){
            dispatch(setUser('guest-token', username));
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

