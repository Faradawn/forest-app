import React from 'react'
import { View, TextInput, Text, StyleSheet, ImageBackground, Modal, BackHandler, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/store';
import AsyncStorage from '@react-native-community/async-storage';
import { PrivacyText, UserText } from '../data/PrivacyText';

const { width, height } = Dimensions.get('screen');

// 第一页面：Welcome
export const Welcome = ({navigation}) => {
  return (
    <View style={styles.container} >
      <TouchableOpacity>
        <ImageBackground
          source={require('../../assets/images/welcome-flower.jpg')}
          imageStyle={{borderRadius: theme.border}}
          style={styles.imageCard}
        />
      </TouchableOpacity>

      <Text 
        style={{fontSize: 23, letterSpacing: 2, marginBottom: 30}}>
          拉丁园，终于等到你!
      </Text>

      <TouchableOpacity 
        style={styles.signupButton}
        onPress={() => navigation.navigate('注册')}>
        <Text style={styles.signUpText} >打开大门</Text>
      </TouchableOpacity>

    </View>
  )
}

// 第二页面：注册新用户
export const SignUp = ({navigation}) => {
  const [firstTime, setFirstTime] = React.useState(false)
  const [modal1, setModal1] = React.useState(false)
  const [modal2, setModal2] = React.useState(false)
  const [username, SetUsername] = React.useState('');
  const dispatch = useDispatch();


  const loadAsync = async () => {
    try{
      let retrieved = await AsyncStorage.getItem('firstTime');
      if(!retrieved){
        setFirstTime(true);
      } 
    } catch(e){
      console.log(e)
    }
  }
  React.useEffect(() => {
    setTimeout(loadAsync, 500)
  },[])


  async function handleSignUp(){
    dispatch(setUser('guest-token', username ? username : '朋友'));
    await AsyncStorage.setItem('guest-token', username ? username : '朋友');
    console.log('完成注册：', 'guest-token', username ? username : '朋友');
  }

  async function handleAgree(){
    setFirstTime(false);
    await AsyncStorage.setItem('firstTime', 'already');
    console.log("done setting");
  }

  return(
    <View style={styles.signupContainer}>
      <TouchableOpacity  
        style={styles.backButton}
        onPress={()=>navigation.navigate('欢迎')}>
          <Ionicons name='arrow-back' size={20} color='grey'/>
      </TouchableOpacity>

      <Text style={styles.headerText}>要不要，{'\n'}起个喜欢的昵称？</Text>
      <View style={{height: 30}}></View>

      <View style={styles.inputContainer}>
        <TextInput 
          placeholder='随便一个昵称'
          style={styles.input}
          onChangeText={SetUsername}
          value={username}
        />
      </View>

      {/* 等不及了 */}
      <View style={styles.secondLine}>
        <Text style={styles.headerText}>登入</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Ionicons name= 'arrow-forward-circle' size={60} color="tomato" />
        </TouchableOpacity>
      </View>
      <View style={{height: 40}}></View>
      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.smallText} >等不及了？直接进入！</Text>
      </TouchableOpacity>

      {/* 隐私 modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal1}
        onRequestClose={() => setModal1(false)}>
          <View style={{height, width, alignItems: 'center'}}>
          <View style={style1.modalPri}>
            <TouchableOpacity
            style={{marginTop: 10, marginLeft: -10, marginBottom: 10}}
            onPress={()=>setModal1(false)}>
            <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>

            <UserText/>

          </View>
          </View>
        </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal2}
        onRequestClose={() => setModal2(false)}>
          <View style={{height, width, alignItems: 'center'}}>
          <View style={style1.modalPri}>
            <TouchableOpacity
            style={{marginTop: 10, marginLeft: -10, marginBottom: 10}}
            onPress={()=>setModal2(false)}>
            <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>

            <PrivacyText/>

          </View>
          </View>
        </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={firstTime}
        onRequestClose={() => setFirstTime(false)}
      >
        <View style={{height, width, marginTop: 40, alignItems: 'center'}}>
        <View style={style1.modal}>
          <View style={style1.view1}>

<Text style={{textAlign: 'center', fontSize: 20, marginBottom: 20}}>
服务协议和隐私政策
</Text>

<Text>

请你务必审慎阅读、充分理解“服务协议"和”隐私政策“各条款，包括但不限于：
为了向你提供定制化的服务，我们可能需要你填写昵称。你可以在“设置”中查看、变更昵称信息并管理你的授权。你可阅读
<Text style={{color: 'blue'}} onPress={()=>setModal1(true)}>《服务协议》</Text> 和
<Text style={{color: 'blue'}} onPress={()=>setModal2(true)}>《隐私政策》</Text>
了解详细信息。如你同意，请点击“同意”开始接受我们的服务。

</Text> 
            
          </View>
 
          <View style={style1.view2}>
          <TouchableOpacity style={style1.buttonOne} onPress={handleAgree}>
          <Text>同意</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style1.buttonOne} onPress={()=>BackHandler.exitApp()}>
          <Text>暂不使用</Text>
          </TouchableOpacity>
          </View>
          

        </View>
        </View>
      </Modal>


    </View>
  )
} 


const style1 = StyleSheet.create({
  modalPri: {
    backgroundColor: 'white',
    height: height,
    width: width,
    paddingHorizontal: 30,
    borderRadius: theme.border,
  },
  text1:{
    fontSize: 15,
    marginTop: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  view1:{
    paddingHorizontal: 10,
  },
  view2:{
    marginTop: 20
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: width < 600 ? 400 : 600,
    width: width < 600 ? theme.width-50 : theme.width-200,
    padding: 30,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
    paddingBottom: 40,
    borderRadius: theme.border,
    elevation: 10
  },
  buttonOne: {
    width: 90,
    height: 30,
    marginTop: 15,
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

})

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
    marginTop: 30,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 17,
    letterSpacing: 20,
    marginLeft: 20,
    color: 'white',
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
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: theme.authWidth-30,
  }
})