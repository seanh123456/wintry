import {
  FINANCE_EDIT_INCOME,
  FINANCE_UPDATE_INCOME,
} from '../actions/income'

const initialState = {
  income1: { val: '$0.00', class: '' },
  gIncome: { val: '$0.00', class: '' },
  nIncome: { val: '$0.00', class: '' },
}

export default function inputs(state = initialState, action) {
  switch (action.type) {
    case FINANCE_EDIT_INCOME:
      return {
        ...state,
        income1: action.income1
      }
    case FINANCE_UPDATE_INCOME:
      return {
        ...state,
        income1: action.income1,
      }
    default:
      return state
  }
}
