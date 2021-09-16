import * as React from 'react'
import { Button, Text, View, StyleSheet, ImageBackground, Dimensions, Modal, ScrollView, TouchableOpacity} from 'react-native'
import styles, {theme} from '../assets/styles'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setQuizDone, setWordDone1, setWordDone2 } from './store/store';

const { width, height } = Dimensions.get('screen');


const Stack = createStackNavigator();

function SettingPage({ navigation }) {
  const [firstTime, setFirstTime] = React.useState(false)
  const dispatch = useDispatch();
  async function logOut(){
    try{
      await AsyncStorage.setItem('guest-token', '');
      dispatch(setUser('',''));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ImageBackground style={style1.settingPage} source={require('../assets/wallpaper/bg-setting.png')}>
      <TouchableOpacity
        style={style1.button}
        onPress={()=>navigation.navigate('关于我们')}>
        <Text>关于我们</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={style1.button}
        onPress={()=>navigation.navigate('通用')}>
        <Text>通用</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={style1.button}
        onPress={logOut}>
        <Text>退出登陆</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={style1.button}
        onPress={()=>setFirstTime(true)}>
        <Text>协议和隐私政策</Text>
        </TouchableOpacity>

        <Modal
        animationType="slide"
        transparent={true}
        visible={firstTime}
        onRequestClose={() => setFirstTime(false)}
      >
        <View style={{height, width, marginTop: 40, alignItems: 'center'}}>
        <View style={style1.modal}>
          <View style={style1.view1}>
            <Text style={style1.text1}>《用户协议与隐私政策隐私政策》</Text>
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
 
          <View style={style1.view2}>
          <TouchableOpacity style={style1.buttonOne} onPress={()=>setFirstTime(false)}>
          <Text>关闭</Text>
          </TouchableOpacity>
          
          </View>
          

        </View>
        </View>
      </Modal>
      
    </ImageBackground>

  )
}
function About() {
  return(
    <View style={styles.homePage}>
<Text style={style1.text}>
这个是一套 {'\n'}
园林植物拉丁学名单词记忆卡 {'\n'}
帮助风景园林、园林、观赏园艺专业的朋友； {'\n'}
北林考研得力助手， {'\n'}
唯愿帮你渡过 “拉丁之河”，{'\n'}
早日上岸，修成正果！{'\n'}
祝度过愉快的一天！
</Text>
    </View>
  )
}

function General() {
  const dispatch = useDispatch();

  async function logOut(){
    try{
      await AsyncStorage.setItem('guest-token', '');
      dispatch(setUser('',''));
    } catch (e) {
      console.log(e);
    }
  }
  return(
    <View style={styles.homePage}>
      <TouchableOpacity
        onPress={() => AsyncStorage.setItem('collection', '')}
        style={{marginBottom: 30}}
      />
      
      <TouchableOpacity 
        title='清空单词进度'
        style={style1.button}
        onPress={() => {
          AsyncStorage.setItem('mylist1', '');
          AsyncStorage.setItem('mylist2', '');
          dispatch(setWordDone1(0));
          dispatch(setWordDone2(0));
        }}>
        <Text>清空单词进度</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        title='清空做题进度'
        onPress={() => {
          AsyncStorage.setItem('quizDone', '');
          dispatch(setQuizDone([]));
        }}
        style={style1.button}>
        <Text>清空做题进度</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={logOut}
        style={style1.button}>
        <Text>更改昵称</Text>
      </TouchableOpacity>
     

    </View>
  )
}

export default function Settings() {  
  return(
    <Stack.Navigator initialRouteName='SettingPage'>
      <Stack.Screen name='设置' component={SettingPage}/>
      <Stack.Screen name='关于我们' component={About}/>
      <Stack.Screen name='通用' component={General}/>
    </Stack.Navigator>

  )
}

const style1 = StyleSheet.create({
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



  text: {
    lineHeight: 30,
  },
  settingPage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    flex: 1,
  },
  button: {
    width: 200,
    height: 50,
    marginTop: 20,
    borderColor: 'grey',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})