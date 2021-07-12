import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Settings from './Settings';
import Home from './Home'
import { Cards, MyCollections } from './Cards'
import {CardSet} from './components/CardSet';
import { createStackNavigator } from '@react-navigation/stack';

const Tabs = createBottomTabNavigator();
const HomeTabs = () => (
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
    <Tabs.Screen name='卡片' component={Cards} options={{}}/>
    <Tabs.Screen name='首页' component={Home}/>
    <Tabs.Screen name='设置' component={Settings}/>
    
  </Tabs.Navigator>
)

const Set1 = () => (<CardSet id={1}/>);
const Set2 = () => (<CardSet id={2}/>);

const Stack = createStackNavigator();
const AppRoot = () => (
  <Stack.Navigator>
    <Stack.Screen name='HomeTabs' component={HomeTabs} options={{headerShown:false}}></Stack.Screen>
    <Stack.Screen name='CardSet1' component={Set1} options={{headerShown:false}}></Stack.Screen>
    <Stack.Screen name='CardSet2' component={Set2} options={{headerShown:false}}></Stack.Screen>
    <Stack.Screen name='MyCollections' component={MyCollections} options={{headerShown: false}}/>
    
  </Stack.Navigator>
)

export default AppRoot;
