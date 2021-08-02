# Latin Garden
A flashcard app for Beijing Forestry University students to memorize gardener epistemology.  
Built with React Native and utlizes async storage.  
From March.20,2021 - March.31.2021.   

## 数据结构
登陆信息 (async)
```
guest-token: '朋友'
```

收藏单词本 (async)
```
collection: [
  {
    id: "10150",
    date: 12309230590,
    wordset: 1,
    info: {
      "category": "藿香蓟属",
      "chinese": "藿香蓟",
      "family": "菊科",
      "id": "1",
      "latin": "Ageratum conyzoides",
    }
  },
]
```
quizDone (async)
```
quizDone: [10001, 10002, 10003]
```


Quiz progressArr 信息
```
progressArr = [
  {
    id: 10001,
    quizset: 1,
    question: "苏铁的拉丁名是",
    answer: "Cycus Bellitta",
    answerArr: ["Cycus Bellitta", "Beta", "Charlie", "Gamma"]
  },
]

```

Store 存储
```
// store
const initialState = {
  user: {
    token: '',
    name: '',
  },
  loading: false,
  quizDone: []

} 
```




## Home Page
![home page demo](./assets/demo1.GIF)

## Card Deck Page
![card deck demo](./assets/demo2.GIF)

## Flipping through flashcards
![flashcard demo](./assets/demo3.GIF)

## Clear async storage data
![clear storage](./assets/demo4.GIF)



## Production Log 
Version One: a hard-coded flashcard app
- [x] screen navigation and card stacks
- [x] flashcard flip functionality
- [x] store progress locally
- [x] store starred locally
- [x] Xcode build and submit to app store
<br></br>
Version Two: backend implementation
- [ ] connect to a firebase db
- [ ]
<br></br>
问题集：
- [ ] IOS simulator expo audio? 点击静音和和不静音按钮
- [ ] useEffect 没反应？把async放在setTime out里



### Thanks for reading and wish you a great day!
-- Faradawn





