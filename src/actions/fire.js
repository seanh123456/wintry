export const FIRE_GREETING_BEGIN = 'FIRE_GREETING_BEGIN'
export const FIRE_GREETING_SUCCESS = 'FIRE_GREETING_SUCCESS'
export const FIRE_GREETING_FAILURE = 'FIRE_GREETING_FAILURE'

export const fetchFireGreetingBegin = () => ({
  type: FIRE_GREETING_BEGIN
})

export const fetchFireGreetingSuccess = message => ({
    type: FIRE_GREETING_SUCCESS,
    payload: { message }
})

export const fetchFireGreetingFailure = error => ({
    type: FIRE_GREETING_FAILURE,
    payload: { error }
})

export function fetchFireGreeting() {
  return dispatch => {
    dispatch(fetchFireGreetingBegin())
    return fetch("/api/fire/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchFireGreetingSuccess(json.message))
        return json.message
      })
      .catch(error => dispatch(fetchFireGreetingFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
