import React from 'react'
import { Text, Button, View } from 'react-native'


export default function arrayFunction() {
  const arr1 = [false, false, false, false, false, false, false, false,]
  const [onestar, setOneStar] = React.useState(false)
  const [arrayStar, setArrayStar] = React.useState(arr1)
  const [count, setCount] = React.useState(1)
  
  function next(){
    let a = arrayStar
    a[count-1] = onestar
    setArrayStar(a)
    setCount(count+1)
    setOneStar(arrayStar[count])
  }

  function back(){
    let a = arrayStar
    a[count-1] = onestar
    setArrayStar(a)
    setCount(count-1)
    setOneStar(arrayStar[count-2])
  }

  return (
    <View>
      <Button title='next' onPress={() => next()}></Button>
      <Button title='back' onPress={() => back()}></Button>
      <Button title='reset' onPress={() => (setCount(1), setArrayStar(arr1), setOneStar(false))}></Button>
      <Button title='star' onPress={() => setOneStar(!onestar)}></Button>
      <Button title='check' onPress={() => console.log(arrayStar)}></Button>
      <Text>count: {count}</Text>
      <Text>one star status: {onestar? 'true' : 'false'} </Text>
      <Text>array one status: {arrayStar[count-1] ? 'true' : 'false'}</Text>
      <Text>{arrayStar.map((v, i) => `${i+1} is ${v} ;\n `)}</Text>
    </View>
  )
} 