// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

function HomeScreen({route, navigation, navigation:{ setParams }}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'cornSilk' }}>
      <Text>Home Screen</Text>
      <Text>Home Counter: {route.params.count} </Text>
      <Button title='to detail' onPress={() => navigation.navigate('Detail', {
        id: 10,
        item: 'item1',
      })}/>
      <Button title='setParams' onPress={() => setParams({
        count: route.params.count + 1
      }) }></Button>
    </View>
  );
}

function Detail({route, navigation}) {
  return (
    <View style={styles.container}>
      <Text> Detail Screen</Text>
      <Text> id: {route.params.id} </Text>
      <Text> item: {route.params.item} </Text> 
      <Button title='go Home' onPress={() => navigation.popToTop('home', {count: 10})} ></Button>
      
      </View>
  )
}

function firstScreen({navigation}) {
  return (
    <View>
      <Text> First </Text>
      <Button title='go home' onPress={() => navigation.navigate('Home')}></Button>
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{count: 0}}/>
        <Stack.Screen name="Top" component={firstScreen} />
        <Stack.Screen name="Detail" component={Detail} options={{title: 'Detail'}}/>
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'cornsilk',
    padding: 20,
  }
})

export default App;