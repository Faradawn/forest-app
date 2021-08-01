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



const initialState = {
  user: {
    token: '',
    name: '',
  },
  loading: false,
  cloudErr: false,
  quizDone: [],

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


    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;