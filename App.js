
import * as React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Settings from './screens/Settings';
import Home from './screens/Home'
import Cards from './screens/Cards'
import API from './screens/api/API'
const Tabs = createBottomTabNavigator()


function App() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}



export default App;
