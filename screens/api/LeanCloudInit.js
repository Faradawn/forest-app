import AV from 'leancloud-storage/core';
import * as adapters from '@leancloud/platform-adapters-react-native';

export default function LeanCloudInit(){

  const appId = "BWtVPGrfqg49m2ARO4NnYCJL-gzGzoHsz";
  const appKey = "xqQwY5SQspBNxXSyrHsF7YfH";
  const serverURL = "https://bwtvpgrf.lc-cn-n1-shared.com";
  
  AV.setAdapters(adapters);
  
  AV.init({appId, appKey, serverURL});
}



