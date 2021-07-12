import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

export default function MyCollections({ navigation }){

  const VocabCollection = () => {
    return(
      <View>
        <Text> This is vocab </Text>
      </View>
    )
  }

  return(
    <Stack.Navigator>
      <Stack.Screen name='VocabCollection' component={VocabCollection} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}