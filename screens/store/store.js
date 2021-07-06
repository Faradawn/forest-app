import { createStore } from 'redux';


// actions
export const setUser = (token, name) => ({
  type: 'SET_USER',
  payload: {token, name},
})


const initialState = {
  user: {
    token: '',
    name: '',
  }

}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {token: action.payload.token, name: action.payload.name}
      }
    default:
      return state;
  }
}

const store = createStore(userReducer);

export default store;