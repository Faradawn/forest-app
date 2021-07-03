import AV from 'leancloud-storage/core';
import * as adapters from '@leancloud/platform-adapters-react-native';

export default function LeanCloudInit(){

  /*
  // 国内版 密码
  const appId = "BWtVPGrfqg49m2ARO4NnYCJL-gzGzoHsz";
  const appKey = "xqQwY5SQspBNxXSyrHsF7YfH";
  const serverURL = "https://bwtvpgrf.lc-cn-n1-shared.com";
  */
  const appId = "q6vaBmVVRjvaR8jTdvxGbNzy-MdYXbMMI";
  const appKey = "r3Nt5vLjDG7NTB2vO9rb1Mh9";
  const serverURL = "https://q6vabmvv.api.lncldglobal.com";

  AV.setAdapters(adapters);
  
  AV.init({appId, appKey, serverURL});
}



