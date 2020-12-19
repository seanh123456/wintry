import { combineReducers } from 'redux'
import auth from './authentication'
import finance from './finance'
import recipe from './recipe'

export default combineReducers({
  auth,
  finance,
  recipe
})
