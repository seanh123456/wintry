import {
  AUTH_GREETING_BEGIN,
  AUTH_GREETING_SUCCESS,
  AUTH_GREETING_FAILURE
} from '../actions/authentication'

const initialState = {
  greeting: 'init',
  loading: false,
  error: null
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_GREETING_BEGIN:
      return { ...state, loading: true }
    case AUTH_GREETING_SUCCESS:
      return { ...state, loading: false, greeting: action.payload.message }
    case AUTH_GREETING_FAILURE:
      return { ...state, loading: false, greeting: '', error: action.payload.error }
    default:
      return state
  }
}
