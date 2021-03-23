// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';
import Settings from './screens/Settings';
import styles from './assets/styles';
import MapView, { Marker } from 'react-native-maps';
import { concat } from 'react-native-reanimated';


function HomeScreen({route, navigation, navigation:{ setParams }}) {
  let regionInit = {
    latitude: 40.0055728,
    longitude: 116.347646,
    latitudeDelta: 0.0059107,
    longitudeDelta: 0.0062788, 
  }
  let markerInit = {
    latitude: 40.0059372,
    longitude: 116.3474919,
  }
  const [region, setRegion] = React.useState(regionInit)
  const [x, setX] = React.useState(markerInit)

  return (
    <View style={styles.container}>
      <View>
      <MapView style={styles.map}
        initialRegion={region}
        
        onRegionChange={setRegion}
        region={region}
      >
         <Marker draggable
          coordinate={x}
          onDragEnd={(e) => setX(e.nativeEvent.coordinate)}
          title='在这里！'
          description={'经度'.concat((Math.round(x.latitude * 100)/100).toString()).concat(', 纬度'.concat((Math.round(x.longitude*100)/100).toString()))}
         />
      </MapView>
      <Button title='重置' onPress={() => (setRegion(regionInit), setX(markerInit))}></Button>
      </View>
      
      <Text>x {x.latitude} , {x.longitude}</Text>
      <Text>{region.latitudeDelta} , {region.longitudeDelta}</Text>

      <Button title='Settings' onPress={() => navigation.navigate('Settings')}/>
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
