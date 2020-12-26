import {
  RECIPE_GREETING_BEGIN,
  RECIPE_GREETING_SUCCESS,
  RECIPE_GREETING_FAILURE
} from '../actions/recipe'

const initialState = {
  greeting: 'init',
  loading: false,
  error: null
}

export default function recipe(state = initialState, action) {
  switch (action.type) {
    case RECIPE_GREETING_BEGIN:
      return { ...state, loading: true }
    case RECIPE_GREETING_SUCCESS:
      return { ...state, loading: false, greeting: action.payload.message }
    case RECIPE_GREETING_FAILURE:
      return { ...state, loading: false, greeting: '', error: action.payload.error }
    default:
      return state
  }
}
