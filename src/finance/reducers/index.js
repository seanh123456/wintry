import { combineReducers } from 'redux'
import finance from './finance'
import income from './income'
import tax from './tax'

export default combineReducers({
  finance,
  income,
  tax,
})
