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
    return fetch("/api/finance/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchFinanceGreetingSuccess(json.message))
        dispatch(financeFormatIncome(json.income1))
        return json
      })
      .catch(error => dispatch(fetchFinanceGreetingFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
