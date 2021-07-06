import { createStore } from 'redux';

export const setUser = (token, name) => {
  return ({
    type: 'SET_USER',
    payload: {token, name}
  })
}

export const setLoading = (val) => {
  return ({
    type: 'SET_LOADING',
    payload: val
  })
}


const initialState = {
  user: {
    token: '',
    name: '',
  },
  loading: false,

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

    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;