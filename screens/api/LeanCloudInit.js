import AV from 'leancloud-storage/core';
import * as adapters from '@leancloud/platform-adapters-react-native';

export default function LeanCloudInit(){

  const appId = "q6vaBmVVRjvaR8jTdvxGbNzy-MdYXbMMI";
  const appKey = "r3Nt5vLjDG7NTB2vO9rb1Mh9";
  const serverURL = "https://www.huayuanbaobao.tk";
  
  AV.setAdapters(adapters);
  AV.init({appId, appKey, serverURL});
  console.log('initialize leancloud complete');
}



