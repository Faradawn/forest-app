import { createStore } from 'redux';

export const setUser = (token, name) => {
  return ({type: 'SET_USER', payload: {token, name}})
}
export const setLoading = (val) => {
  return ({type: 'SET_LOADING', payload: val})
}
export const setCloudErr = (bool) => {
  return ({type: 'SET_CLOUD_ERR', payload: bool})
}
export const setCounter = (val) => {
  return ({type: 'SET_COUNTER', payload: val})
}


const initialState = {
  user: {
    token: '',
    name: '',
  },
  loading: false,
  cloudErr: false,
  counter: 0,

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
    case 'SET_CLOUD_ERR':
      return {...state, cloudErr: action.payload}
    case 'SET_COUNTER':
      return {...state, counter: state.counter+action.payload}

    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;