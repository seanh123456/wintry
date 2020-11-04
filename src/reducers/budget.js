import {
  BUDGET_GREETING_BEGIN,
  BUDGET_GREETING_SUCCESS,
  BUDGET_GREETING_FAILURE
} from '../actions/budget'

const initialState = {
  greeting: 'init',
  loading: false,
  error: null
}

export default function budget(state = initialState, action) {
  switch (action.type) {
    case BUDGET_GREETING_BEGIN:
      return { ...state, loading: true }
    case BUDGET_GREETING_SUCCESS:
      return { ...state, loading: false, greeting: action.payload.message }
    case BUDGET_GREETING_FAILURE:
      return { ...state, loading: false, greeting: '', error: action.payload.error }
    default:
      return state
  }
}
