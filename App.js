// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen 2</Text>
      <Button title='go to detail' onPress={() => navigation.navigate('Detail')}></Button>
    </View>
  );
}

function Detail({navigation}) {
  return (
    <View>
      <Text> Detail Screen</Text>
      <Button title='push title' onPress={() => navigation.goBack() }></Button>
      
      </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Detail" component={Detail} options={{title: 'Detail'}}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;