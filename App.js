
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LeanCloudInit from './screens/api/LeanCloudInit'
import AuthRoot from './screens/AuthRoot'
import AppRoot from './screens/AppRoot';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './screens/store/store';
import { useSelector } from 'react-redux';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const sessionToken = useSelector(state => state.user.token);
  
  return (
    <RootStack.Navigator headerMode='none'>
      {sessionToken ? (
        <RootStack.Screen name='主页' component={AppRoot}/>
      ) : (
        <RootStack.Screen name='验证' component={AuthRoot}/>
      )}
    </RootStack.Navigator>
  )
}


export default function App() {

  const sessionToken = '';


  // LeanCloudInit();

  return (
    <Provider store={store}>
      <NavigationContainer>
      
        <RootStackScreen />
        
      </NavigationContainer>
    </Provider>


  );
}

