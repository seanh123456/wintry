export const RECIPE_GREETING_BEGIN = 'RECIPE_GREETING_BEGIN'
export const RECIPE_GREETING_SUCCESS = 'RECIPE_GREETING_SUCCESS'
export const RECIPE_GREETING_FAILURE = 'RECIPE_GREETING_FAILURE'

export const fetchRecipeGreetingBegin = () => ({
  type: RECIPE_GREETING_BEGIN
})

export const fetchRecipeGreetingSuccess = message => ({
    type: RECIPE_GREETING_SUCCESS,
    payload: { message }
})

export const fetchRecipeGreetingFailure = error => ({
    type: RECIPE_GREETING_FAILURE,
    payload: { error }
})

export function fetchRecipeGreeting() {
  return dispatch => {
    dispatch(fetchRecipeGreetingBegin())
    return fetch("/api/recipe/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        console.log(json)
        dispatch(fetchRecipeGreetingSuccess(json.message))
        return json.message
      })
      .catch(error => dispatch(fetchRecipeGreetingFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
