import {
  FINANCE_GREETING_BEGIN,
  FINANCE_GREETING_SUCCESS,
  FINANCE_GREETING_FAILURE,
  FINANCE_EDIT_INCOME,
  FINANCE_UPDATE_INCOME
} from '../actions/finance'
const initialState = {
  greeting: 'init',
  loading: false,
  error: null,
  income1: { val: '$0.00', class: '' },
  effFITax: { val: '$0.00', class: '' },
  effFTax: { val: '$0.00', class: '' },
  gIncome: { val: '$0.00', class: '' },
  effSTax: { val: '$0.00', class: '' },
  effLTax: { val: '$0.00', class: '' },
  nIncome: { val: '$0.00', class: '' },
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
    case FINANCE_EDIT_INCOME:
      return {
        ...state,
        income1: action.income1
      }
    case FINANCE_UPDATE_INCOME:
      return {
        ...state,
        income1: action.income1,
        gIncome: action.gIncome,
        effFITax: action.effFITax,
        effFTax: action.effFTax,
        effSTax: action.effSTax,
        effLTax: action.effLTax,
        nIncome: action.nIncome
      }
    default:
      return state
  }
}
