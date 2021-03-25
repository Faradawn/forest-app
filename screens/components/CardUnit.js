import * as React from 'react'
import { FlatList, Text, View, StyleSheet } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'
import styles from '../../assets/styles'


export default function Card(props) {
  const [flip, setFlip] = React.useState('false')
  const some = {id:1, chinese:'加载中...', latin:'', family:'', category:''}
  const data = props.data
  const keylist = Object.keys(data).slice(2, Object.keys(data).length)

  React.useEffect(() => {setFlip(true)}, [])
  
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
      <View>
        <Text>拉丁名：{data.latin}</Text>
        <Text>{data.family}科</Text>
        <Text>{data.category}属</Text>
      </View>
    )
  }
  return(
    <View>
      <TouchableOpacity style={styles.cardUnit} onPress={() => setFlip(!flip)}>
        {flip ? front() : back()}
      </TouchableOpacity>
    </View>
  )
}

const stylelocal = StyleSheet.create({
  back: {
    paddingTop: 10,
    backgroundColor: 'cornsilk'
  }
})