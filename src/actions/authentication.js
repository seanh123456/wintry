export const AUTH_GREETING_BEGIN = 'AUTH_GREETING_BEGIN'
export const AUTH_GREETING_SUCCESS = 'AUTH_GREETING_SUCCESS'
export const AUTH_GREETING_FAILURE = 'AUTH_GREETING_FAILURE'

export const fetchAuthGreetingBegin = () => ({
  type: AUTH_GREETING_BEGIN
})

export const fetchAuthGreetingSuccess = message => ({
    type: AUTH_GREETING_SUCCESS,
    payload: { message }
})

export const fetchAuthGreetingFailure = error => ({
    type: AUTH_GREETING_FAILURE,
    payload: { error }
})

export function fetchAuthGreeting() {
  return dispatch => {
    dispatch(fetchAuthGreetingBegin())
    return fetch("/api/auth/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchAuthGreetingSuccess(json.message))
        return json.message
      })
      .catch(error => dispatch(fetchAuthGreetingFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
