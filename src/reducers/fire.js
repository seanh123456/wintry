import {
  FIRE_GREETING_BEGIN,
  FIRE_GREETING_SUCCESS,
  FIRE_GREETING_FAILURE
} from '../actions/fire'

const initialState = {
  greeting: 'init',
  loading: false,
  error: null
}

export default function fire(state = initialState, action) {
  switch (action.type) {
    case FIRE_GREETING_BEGIN:
      return { ...state, loading: true }
    case FIRE_GREETING_SUCCESS:
      return { ...state, loading: false, greeting: action.payload.message }
    case FIRE_GREETING_FAILURE:
      return { ...state, loading: false, greeting: '', error: action.payload.error }
    default:
      return state
  }
}
