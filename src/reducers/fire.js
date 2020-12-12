import {
  FIRE_GREETING_BEGIN,
  FIRE_GREETING_SUCCESS,
  FIRE_GREETING_FAILURE,
  FIRE_UPDATE_INCOME
} from '../actions/fire'

const initialState = {
  greeting: 'init',
  loading: false,
  error: null,
  income1: '$0.00',
  effFTax: '$0.00',
  gIncome: '$0.00',
  effSTax: '$0.00',
  effLTax: '$0.00',
  nIncome: '$0.00'
}

export default function fire(state = initialState, action) {
  switch (action.type) {
    case FIRE_GREETING_BEGIN:
      return { ...state, loading: true }
    case FIRE_GREETING_SUCCESS:
      return {
        ...state,
        loading: false,
        greeting: action.payload.message,
      }
    case FIRE_GREETING_FAILURE:
      return { ...state, loading: false, greeting: '', error: action.payload.error }
    case FIRE_UPDATE_INCOME:
      return {
        ...state,
        income1: action.income1,
        gIncome: action.gIncome,
        effFTax: action.effFTax,
        effSTax: action.effSTax,
        effLTax: action.effLTax,
        nIncome: action.nIncome
      }
    default:
      return state
  }
}
