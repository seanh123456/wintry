export const BUDGET_GREETING_BEGIN = 'BUDGET_GREETING_BEGIN'
export const BUDGET_GREETING_SUCCESS = 'BUDGET_GREETING_SUCCESS'
export const BUDGET_GREETING_FAILURE = 'BUDGET_GREETING_FAILURE'

export const fetchBudgetGreetingBegin = () => ({
  type: BUDGET_GREETING_BEGIN
})

export const fetchBudgetGreetingSuccess = message => ({
    type: BUDGET_GREETING_SUCCESS,
    payload: { message }
})

export const fetchBudgetGreetingFailure = error => ({
    type: BUDGET_GREETING_FAILURE,
    payload: { error }
})

export function fetchBudgetGreeting() {
  return dispatch => {
    dispatch(fetchBudgetGreetingBegin())
    return fetch("/api/budget/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchBudgetGreetingSuccess(json.message))
        return json.message
      })
      .catch(error => dispatch(fetchBudgetGreetingFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
