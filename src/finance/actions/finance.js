import axios from 'axios'
import { financeEnterEntry } from '../actions/income'

export const FINANCE_GREETING_BEGIN = 'FINANCE_GREETING_BEGIN'
export const FINANCE_GREETING_SUCCESS = 'FINANCE_GREETING_SUCCESS'
export const FINANCE_GREETING_FAILURE = 'FINANCE_GREETING_FAILURE'

export const fetchFinanceGreetingBegin = () => ({
    type: FINANCE_GREETING_BEGIN
})

export const fetchFinanceGreetingSuccess = message => ({
  type: FINANCE_GREETING_SUCCESS,
  payload: { message }
})

export const fetchFinanceGreetingFailure = error => ({
  type: FINANCE_GREETING_FAILURE,
  payload: { error }
})

export function fetchFinanceGreeting() {
  return dispatch => {
    dispatch(fetchFinanceGreetingBegin())

    return axios.get('/api/finance/')
      .then((response) => {
        dispatch(fetchFinanceGreetingSuccess(response.data.message))
        dispatch(financeEnterEntry('income1', response.data.income1))
        return response
      })
      .catch(error => dispatch(fetchFinanceGreetingFailure(error)))
  }
}
