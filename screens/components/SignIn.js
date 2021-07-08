import React from 'react'
import { View, TextInput, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';
import AV from 'leancloud-storage/core';
import { useDispatch, useSelector } from 'react-redux';
import { setCounter, setUser } from '../store/store';
import AsyncStorage from '@react-native-community/async-storage';

// 第一页面：Welcome
export const Welcome = ({navigation}) => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);

  const token = 'guest';
  const name = 'guest';

  async function guestLogin(){
    try{
      await AsyncStorage.setItem('localToken', 'guest');
      dispatch(setUser(token, name));
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container} >
      <TouchableOpacity>
        <ImageBackground
          source={require('../../assets/images/welcome-flower.jpg')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}/>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => navigation.navigate('注册')}>
        <Text style={styles.signUpText} > 注册</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => navigation.navigate('登陆')}>
        <Text style={styles.loginText} > 登陆</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={guestLogin}>
        <Text style={styles.bottomText}>等不及了？直接进入</Text>
      </TouchableOpacity>
      <ActivityIndicator animating={loading} hidesWhenStopped/>

    </View>
  )
}

// 第二页面：注册新用户
export const SignUp = ({navigation}) => {
  const [username, SetUsername] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, SetPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const cloudErr = useSelector(state => state.cloudErr);
  
  function handleSignUp(){
    if(isLoading){
      return;
    }
    if(cloudErr){
      alert('后端云开小差了，直接进入试试？');
      dispatch(setCounter(1));
      navigation.navigate('欢迎');
      return;
    }
    if(username && phone && passwoard){
      setLoading(true);
      const user = new AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.setMobilePhoneNumber(`+86${phone}`);
  
      user.signUp().then((user) => {
        console.log('注册成功',user);
        setLoading(false);
        dispatch(setUser(user.getSessionToken(), username));
      })
      .catch((error) => {
        setLoading(false)
        console.log('错误是', error);
        if(error.code === 127){
          alert('手机号不太合规？');
        } else if(error.code === 214){
          alert('手机好像注册过了？');
        } else {
          alert(error.message);
        }
      });

    } else {
      alert('有没有漏填的项～')
      setLoading(false);
    }

  }

  return(
    <View style={styles.signupContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={()=>navigation.navigate('欢迎')}>
        <Ionicons name='arrow-back' size={20} color='grey'/>
      </TouchableOpacity>

      <Text style={styles.headerText}>快来，{'\n'}在这里被欢迎！</Text>
      <View style={{height: 30}}></View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='手机号'
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          keyboardType='numeric'
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='用户名'
          style={styles.input}
          onChangeText={SetUsername}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='密码'
          style={styles.input}
          onChangeText={SetPassword}
          value={password}
          autoCapitalize='none'
          onEndEditing={handleSignUp}
        />
      </View>

      {/* one line flex */}
      <View style={styles.secondLine}>
        <Text style={styles.headerText}>注册</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Ionicons name= 'arrow-forward-circle' size={60} color="tomato" />
          <ActivityIndicator animating={isLoading} hidesWhenStopped/>
        </TouchableOpacity>
      </View>
      <View style={{height: 40}}></View>
      <TouchableOpacity onPress={()=>navigation.navigate('登陆')}>
        <Text style={styles.smallText} >已有用户？点我登陆</Text>
      </TouchableOpacity>
    </View>
  )
} 

// 第三页面：登陆老用户
export const SignIn = ({navigation}) => {

  const [phone, setPhone] = React.useState('');
  const [password, SetPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const cloudErr = useSelector(state => state.cloudErr);

  function handleLogIn(){
    if(isLoading){
      return;
    }
    if(cloudErr){
      alert('后端云开小差了，直接进入试试？');
      dispatch(setCounter(1));
      navigation.navigate('欢迎');
      return;
    }
    setLoading(true);
    AV.User.logInWithMobilePhone(`+86${phone}`, password).then(user => {
      console.log('手机登陆成功！', user);
      dispatch(setUser(user.getSessionToken(), user.getUsername()));
      setLoading(false);
    })
    .catch(error => {
      console.log('登陆error', error);
      setLoading(false);
      alert('用户名和密码好像不太匹配？');
    });
  }

  return (
    <View style={styles.signupContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('欢迎')}>
        <Ionicons name='arrow-back' size={20} color='grey'/>
      </TouchableOpacity>
      <Text style={styles.headerText}>又见面，{'\n'}回到温暖的家！</Text>
      <View style={{height: 30}}></View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='手机号'
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='密码'
          style={styles.input}
          onChangeText={SetPassword}
          value={password}
          autoCapitalize='none'
          onEndEditing={handleLogIn}
        />
      </View>

      {/* one line flex */}
      <View style={styles.secondLine}>
        <Text style={styles.headerText}>登入</Text>
        <TouchableOpacity onPress={handleLogIn}>
          <Ionicons name= 'arrow-forward-circle' size={60} color="tomato" />
          <ActivityIndicator animating={isLoading} hidesWhenStopped/>
        </TouchableOpacity>
      </View>

      <View style={{height: 40}}></View>
      <TouchableOpacity onPress={() => navigation.navigate('注册')}>
        <Text style={styles.smallText} >新来的？点我注册</Text>
      </TouchableOpacity>
      
    </View>
  )
}




const styles = StyleSheet.create({

  // containers
  container: {
    alignItems: 'center',
    paddingTop: theme.marginTop,
  },
  signupContainer: {
    alignItems: 'flex-start',
    paddingLeft: 50,
    paddingTop: theme.marginTop+20,
  },

  backButton:{
    top: -10,

  },

  // 第一页：欢迎
  imageCard: {
    marginBottom: 30,
    height: theme.height,
    borderRadius: theme.border,
    width: theme.authWidth+30,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  // 上方实心按钮 
  signupButton: {
    backgroundColor: 'tomato',
    width: theme.authWidth,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  // 下面按钮
  loginButton: {
    backgroundColor: 'white',
    width: theme.authWidth,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
    signUpText: {
      fontSize: 15,
      letterSpacing: 50,
      color: 'white',
    },
    loginText: {
      fontSize: 14,
      letterSpacing: 50,
      borderColor: 'black',
    },
    bottomText: {
      color: 'grey',
      fontSize: 13,
      letterSpacing: 5,
      margin: 10,
    },



  // 第二页：输入框子
  input: {
    height: 40,
    width: theme.authWidth-30,
  },

  inputContainer: {
    height: 40,
    width: theme.authWidth-40,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 30,
    letterSpacing: 4,
    lineHeight: 45,
  },

  smallText: {
    color: 'black',
  },

  secondLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: theme.authWidth-30,
  }
})