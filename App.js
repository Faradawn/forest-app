
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LeanCloudInit from './screens/api/LeanCloudInit'
import AuthRoot from './screens/AuthRoot'
import AppRoot from './screens/AppRoot';
import { AuthContext } from './screens/api/context';
import { createStackNavigator } from '@react-navigation/stack';

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode='none'>
    {userToken ? (
      <RootStack.Screen name='主页' component={AppRoot}/>
    ) : (
      <RootStack.Screen name='验证' component={AuthRoot}/>
    )}
  </RootStack.Navigator>

)


export default function App() {
  const [sessionToken, setSessionToken] = React.useState(null);

  const authMemo = React.useMemo(() => {
    return {
      signIn: (token) => {
        setSessionToken(token);
        console.log('signed up token is: ', token);
      },
      signOut: () => {
        setSessionToken(null);
      }

    }
  })

  // LeanCloudInit();

  return (
    <AuthContext.Provider value={authMemo}>
      <NavigationContainer>
      
        <RootStackScreen userToken={sessionToken}/>
        
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

