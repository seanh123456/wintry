import {
  FINANCE_GREETING_BEGIN,
  FINANCE_GREETING_SUCCESS,
  FINANCE_GREETING_FAILURE,
} from '../actions/finance'

const initialState = {
  greeting: 'init',
  loading: false,
  error: null,
}

export default function finance(state = initialState, action) {
  switch (action.type) {
    case FINANCE_GREETING_BEGIN:
      return { ...state, loading: true }
    case FINANCE_GREETING_SUCCESS:
      return {
        ...state,
        loading: false,
        greeting: action.payload.message,
      }
    case FINANCE_GREETING_FAILURE:
      return { ...state, loading: false, greeting: '', error: action.payload.error }
    default:
      return state
  }
}
