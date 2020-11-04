import { combineReducers } from 'redux'
import auth from './authentication'
import budget from './budget'
import fire from './fire'
import recipe from './recipe'

export default combineReducers({
  auth,
  budget,
  fire,
  recipe
})
