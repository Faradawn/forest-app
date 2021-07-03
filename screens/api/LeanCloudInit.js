import AV from 'leancloud-storage/core';
import * as adapters from '@leancloud/platform-adapters-react-native';

export default function LeanCloudInit(){

  /*
  // 国内版 LeanCloud
  const appId = "BWtVPGrfqg49m2ARO4NnYCJL-gzGzoHsz";
  const appKey = "xqQwY5SQspBNxXSyrHsF7YfH";
  const serverURL = "https://bwtvpgrf.lc-cn-n1-shared.com";
  */

  // 国际版 LeanCloud
  const appId = "q6vaBmVVRjvaR8jTdvxGbNzy-MdYXbMMI";
  const appKey = "r3Nt5vLjDG7NTB2vO9rb1Mh9";
  const serverURL = "https://q6vabmvv.api.lncldglobal.com";

  AV.setAdapters(adapters);
  
  AV.init({appId, appKey, serverURL});
}

function test(){
  const AssetDelivery = AV.Object.extend('AssetDelivery');
  const asset = new AssetDelivery();
  asset.set('type', 'about-main-text');
  asset.set('number', 1);
  asset.set('text', '这是一个拉丁名的app');
  asset.save().then(obj=>{
    console.log('上传', obj);
  })
  .catch(error=>console.log(error));
}

