import { combineReducers } from 'redux'
import auth from '../authentication/reducers'
import finance from '../finance/reducers'
import recipe from '../recipe/reducers'

export default combineReducers({
  auth,
  finance,
  recipe
})
