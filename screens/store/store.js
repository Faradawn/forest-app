import { createStore } from 'redux';

// actions
export const ADD_Task = 'ADD_Task';

// types
export const addTask = (task) => ({
  type: ADD_Task,
  payload: task,
})




const initialState = {
  tasks: [
    {id: '1', text: 'task 1'},
    {id: '2', text: 'task 2'},
  ]
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_Task:
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Math.floor(Math.random()*10).toString,
          task: action.payload,
        }]
      }
    default:
      return state;
  }
}

const store = createStore(taskReducer);

export default store;