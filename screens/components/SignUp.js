import React from 'react'
import { View, TextInput, Text, StyleSheet, Button } from 'react-native'
import { theme } from '../../assets/styles'
// import LeanCloud from '../api/LeanCloudInit'


function handleSignUp({username, password}) {
  User.signUp({username, password})
    .then((userObj) => {
      setUser(userObj);
      setErrMsg('');
    })
    .catch((error) => setErrMsg(error.message));
}



const SignUp = () => {
  const [user, setUser] = useState();
  const [errMsg, setErrMsg] = useState('');

  const [phone, setPhone] = React.useState(null);
  const [password, SetPassword] = React.useState('');

  function handleSubmit(){
    console.log(phone, password);

  }

  return(
    <View style={styles.container}>
      <Text>注册</Text>
      <TextInput 
        placeholder='手机号'
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        keyboardType='numeric'
      />
      <TextInput 
        placeholder='密码'
        style={styles.input}
        onChangeText={SetPassword}
        value={password}
        autoCapitalize='none'
      />

      <Button onPress={handleSubmit} title='注册'/>


    </View>
  )
} 

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  input: {
    height: 40,
    width: theme.width-50,
    margin: 20,
    paddingLeft: 15,
    borderWidth: 1,
    alignItems: 'center',
  },
});