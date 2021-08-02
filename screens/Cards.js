import * as React from 'react'
import { Modal, Text, View, StyleSheet, ImageBackground, Image, Dimensions } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { MyCollection } from './components/MyCollection';
import { useSelector } from 'react-redux';

const {height, width} = Dimensions.get('screen');
const Stack = createStackNavigator();

const Cards = () => {  

  const  CardsList = ({ navigation }) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    var username = useSelector(state => state.user.name);
    if(username === '朋友'){
      username = '我'
    }

    return (
      <View style={styles.container}>
        <View style={styles.oneLine}>
          <Text style={styles.oneText}>{username}的学习场</Text>
          <TouchableOpacity onPress={() => {setModalVisible(!modalVisible)}}>
          <MaterialCommunityIcons name="notebook-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('CardSet1', {id: 1})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 园林树木拉丁名150个 </Text>
          </ImageBackground> 
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => navigation.navigate('CardSet2', {id: 2})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 园林花卉拉丁名200个 </Text>
          </ImageBackground> 
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Quiz1', {id: 1})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 「十道题」 园林树木拉丁名 </Text>
          </ImageBackground> 
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Quiz2', {id: 2})} >
          <ImageBackground
            source={require('../assets/wallpaper/card-slim.png')}
            imageStyle={{borderRadius: theme.border}}
            style={styles.imageCard}>
              <Text> 「十道题」 园林花卉拉丁名 </Text>
          </ImageBackground> 
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{height, width, marginTop: 110, alignItems: 'center'}}>
          <View style={styles.modal}>

            <TouchableOpacity
                style={{marginTop: 15, marginLeft: 15}}
                onPress={()=>setModalVisible(false)}>
                <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>

            <MyCollection/>
            
          </View>
          </View>
        </Modal>
        
        </View>        
      </View>
    )
  }

  return(
    <Stack.Navigator>
      <Stack.Screen name='CardsList' component={CardsList} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
      
}

export default Cards;

const styles = StyleSheet.create({
  // modal
  modal: {
    backgroundColor: 'white',
    height: height,
    width: width,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
    paddingBottom: 40,
    borderRadius: theme.border,
  },
 
  // top
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop+20, 
    backgroundColor: 'white',
    flex: 1,
  },
  oneLine:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: theme.authWidth,
  },
  oneText:{
    fontSize: 25,
    letterSpacing: 2,
    marginBottom: 30,
  },

  // image card 
  imageCard: {
    height: 130,
    borderRadius: theme.border,
    width: theme.width+50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.4,
  }
})