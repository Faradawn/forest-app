import * as React from 'react'
import { FlatList, Text, View, StyleSheet, ImageBackground } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import styles, {theme} from '../../assets/styles'

/**
 * Form for user login
 * @param {object} props Component props
 * @param {array} props.data Wordset data
 * @param {number} props.wordset_id Wordset number
 */
export default function Card(props) {
  const [flip, setFlip] = React.useState(false);
  var data = props.data;
  if(!data){
    data = {id: "0", chinese: "加载中", latin: "", category: "", family: ""};
  }
  
  function front(){
    return(
      <View>
        <Text>{data.chinese}</Text>
      </View>
    )
  }
  // function back(){
  //   return(
  //     <View style={stylelocal.back}>
  //       <FlatList
  //         data={keylist}
  //         renderItem={({item}) => <Text>{data[item]}</Text>}
  //         keyExtractor={(v, i) => i.toString()}>
  //       </FlatList> 
  //     </View>
  //   )
  // }

  function back() {
    return(
      <View style={{alignItems: 'center',}}>
        <Text style={{fontStyle: 'italic'}}>{data.latin}</Text>
        <View style={{height: 3}}></View>
        <Text>{data.family} {data.category}</Text>
        <Text>{data.definition}</Text>
      </View>
    )
  }
  return(
    <View>
      <TouchableOpacity onPress={() => setFlip(!flip)}>
        <ImageBackground
          source={require('../../assets/wallpaper/card-orange.png')}
          imageStyle={{borderRadius: theme.border}}
          style={style1.imageCard}>
            {flip ? front() : back()}
        </ImageBackground> 
      </TouchableOpacity>
    </View>
  )
}


const style1 = StyleSheet.create({
  imageCard: {
    height: 200,
    borderRadius: theme.border,
    width: theme.width,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.4,
  }
})