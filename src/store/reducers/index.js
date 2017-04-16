import {combineReducers } from 'redux'
import user from './user'
import status from './status'



const reducers = combineReducers({
  user,
  status
})


export default reducers