import React from 'react'
import { View, TextInput, Text, StyleSheet, ImageBackground, Modal, BackHandler, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { theme } from '../../assets/styles'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/store';
import AsyncStorage from '@react-native-community/async-storage';

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
        visible={firstTime}
        onRequestClose={() => setFirstTime(false)}
      >
        <View style={{height, width, marginTop: 40, alignItems: 'center'}}>
        <View style={styles.modal}>
          <View style={styles.view1}>
            <Text style={styles.text1}>《用户服务协议和隐私政策》</Text>
            <ScrollView>
              <Text>

              《用户服务协议和隐私政策》及其条款，是为您下载、安装及使用“拉丁园软件”（简称：拉丁园）所订立的、描述您与本软件之间权利义务的协议。{"\n\n"}

请务必认真阅读本协议的内容、充分理解各条款内容，您可选择不进入本软件。一旦您确认本用户注册协议后，本协议即在您和本软件之间产生法律效力。{"\n\n"}

第一部分：用户使用{"\n\n"}

用户按照页面给与的提示完成全部注册步骤后，即成为本软件的用户，用户应自行保管账号及密码，并准确、安全地使用其账号及密码。本软件可通过用户自行设定，向用户提供个性化信息服务。{"\n\n"}

用户充分了解并同意，本软件为用户提供个性化信息服务，用户须为自己注册账号下的行为负责。本软件不对因用户行为而导致的损失承担责任。{"\n\n"}

用户须对在本软件上所传送信息的真实性、合法性、有效性等负责，与用户所传播的信息相关的任何法律责任由用户自行承担，与本软件无关。{"\n\n"}

用户提供的个人信息或发布的信息不真实、不准确、不合法；发表内容不符合本协议或发表内容不符合法律法规的，本软件有权暂停或终止用户使用本平台的服务。{"\n\n"}

用户不得利用本软件服务制作或者转载如下内容：反对宪法所确定的基本原则的; 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视，破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的。{"\n\n\n"}

第二部分：隐私政策：{"\n\n"}

拉丁园重视用户的隐私。您在使用我们的服务时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，以及我们为您提供的访问、更新、控制和保护这些信息的方式。{"\n\n"}

如对本《隐私政策》或相关事宜有任何问题，请通过1050758520@qq.com与我们联系。{"\n\n"}

一、我们可能收集的信息{"\n\n"}

个人信息是指以电子或者其他方式记录的能够单独或者与其他信息， 结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。 由于我们的产品和服务并不需要此类信息，因此很高兴的告知您， 我们不会收集关于您的任何个人信息。{"\n\n"}

二、我们如何存储和保护您的个人信息{"\n\n"}

作为一般规则，我们仅在实现信息收集目的所需的时间内保留您的个人信息。出于遵守法律义务或为证明某项权利或合同满足适用的诉讼时效要求的目的， 我们可能需要在上述期限到期后保留您存档的个人信息，并且无法按您的要求删除。 {"\n\n"}

我们使用符合业界标准的安全防护措施保护您提供的个人信息，并加密其中的关键数据。我们会采取一切合理可行的措施，保护您的个人信息。{"\n\n"}


三、我们如何共享、转让、公开披露您的个人信息{"\n\n"}

在管理我们的日常业务活动所需要时，为追求合法利益以更好地服务客户， 我们将合规且恰当的使用您的个人信息。出于对业务和各个方面的综合考虑， 我们仅自身使用这些数据，不与任何第三方分享。{"\n\n"}

我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。 我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。{"\n\n"}

四、隐私政策的适用范围：{"\n\n"}

除某些特定服务外，我们所有的服务均适用本《隐私政策》。这些特定服务将适用特定的隐私政策。如相关特定服务的隐私政策与本《隐私政策》有不一致之处，适用该特定服务的隐私政策。
              </Text>

            </ScrollView>
            
          </View>
 
          <View style={styles.view2}>
          <TouchableOpacity style={styles.buttonOne} onPress={handleAgree}>
          <Text>同意</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOne} onPress={()=>BackHandler.exitApp()}>
          <Text>暂不使用</Text>
          </TouchableOpacity>
          </View>
          

        </View>
        </View>
      </Modal>


    </View>
  )
} 




const styles = StyleSheet.create({
  text1:{
    fontSize: 15,
    marginTop: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  view1:{
    height: 450,
    width: width < 600 ? theme.width-70 : theme.width-220,
    paddingHorizontal: 10,
  },
  view2:{
    marginTop: 20
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: width < 600 ? 600 : 800,
    width: width < 600 ? theme.width-50 : theme.width-200,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 20,
    shadowOpacity: 0.4,
    paddingBottom: 40,
    borderRadius: theme.border,
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