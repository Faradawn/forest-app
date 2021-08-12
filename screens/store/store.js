import { createStore } from 'redux';

export const setUser = (token, name) => {
  return ({type: 'SET_USER', payload: {token, name}})
}
export const setLoading = (val) => {
  return ({type: 'SET_LOADING', payload: val})
}
export const setQuizDone = (val) => {
  return ({type: 'SET_QUIZDONE', payload: val})
}
export const setWordDone1 = (val) => {
  return ({type: 'SET_WORDDONE1', payload: val})
}
export const setWordDone2 = (val) => {
  return ({type: 'SET_WORDDONE2', payload: val})
}

const initialState = {
  user: {
    token: '',
    name: '',
  },
  loading: false,
  cloudErr: false,
  quizDone: [],
  wordDone1: 0,
  wordDone2: 0,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {token: action.payload.token, name: action.payload.name}
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SET_QUIZDONE':
      return {
        ...state,
        quizDone: action.payload
      }
    case 'SET_WORDDONE1':
      return {
        ...state,
        wordDone1: action.payload
      }
    case 'SET_WORDDONE2':
      return {
        ...state,
        wordDone2: action.payload
      }

    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;