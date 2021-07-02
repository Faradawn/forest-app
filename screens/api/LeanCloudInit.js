import AV from 'leancloud-storage/core';
import * as adapters from '@leancloud/platform-adapters-react-native';

export default function LeanCloudInit(){

  const appId = "BWtVPGrfqg49m2ARO4NnYCJL-gzGzoHsz";
  const appKey = "xqQwY5SQspBNxXSyrHsF7YfH";
  const serverURL = "https://bwtvpgrf.lc-cn-n1-shared.com";
  
  AV.setAdapters(adapters);
  
  AV.init({appId, appKey, serverURL});

  const TestObject = AV.Object.extend('TestObject');
  const testObject = new TestObject();
  testObject.set('word2', 'Hello world2!');
  testObject.save().then((testObject) => {
    console.log('保存成功2。', testObject)
  });


}



