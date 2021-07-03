
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Settings from './screens/Settings';
import Home from './screens/Home'
import Cards from './screens/Cards'
import {Auth} from './screens/Auth'
import LeanCloudInit from './screens/api/LeanCloudInit'

const Tabs = createBottomTabNavigator()

const AppTabsScreen = () => (
  <Tabs.Navigator initialRouteName='首页'
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let icon;
        if (route.name === '首页') {
          icon=focused? 'home' : 'home-outline'
        }
        else if (route.name === '设置') {icon=focused?'settings' : 'settings-outline'}
        else if (route.name === '卡片') {icon=focused? 'file-tray' : 'file-tray-outline'}
        return <Ionicons name={icon} size={size} color={color} />
      }
    })}
    tabBarOptions={{activeTintColor: 'tomato', inactiveTintColor: 'grey'}}>

    <Tabs.Screen name='卡片' component={Cards}/>
    <Tabs.Screen name='首页' component={Home}/>
    <Tabs.Screen name='设置' component={Settings}/>
    
  </Tabs.Navigator>
)



export default function App() {
  const loading = true;

  LeanCloudInit();

  return (
    <NavigationContainer>
       <Auth/> 
      
    </NavigationContainer>

  );
}

