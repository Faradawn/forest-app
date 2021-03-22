// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import Settings from './screens/Settings';
import styles from './assets/styles';

function HomeScreen({route, navigation, navigation:{ setParams }}) {
  const [search, setSearch] = React.useState('')
  return (
    <View style={styles.container}>
      
      <Text> {search} </Text>

      <Button title='go Settings' onPress={() => navigation.navigate('Settings')}/>

      <TextInput
        style={styles.search}
        placeholder='输入目的地'
        value={search}
        onChangeText={setSearch}/>
      

    </View>
  );
}


function CreateJob({navigation, route}) {
  const [jobTitle, setJobTitle] = React.useState('')

  return (
    <View style={styles.container}>
      <Text> Create Job Page </Text>
      <TextInput
        multiline
        placeholder='job title'
        value={jobTitle}
        onChangeText={setJobTitle}/>
      <Button title='Enter' onPress={() => navigation.navigate('Detail', {
        job: jobTitle,
        user: route.params.user
      })}></Button>
    </View>
  )
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} initialParams={{count: 0}}/>
        <Stack.Screen name="Settings" component={Settings}/>
        
        
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;