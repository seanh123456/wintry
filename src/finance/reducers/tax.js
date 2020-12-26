import {
  FINANCE_CALC_TAX,
} from '../actions/tax'

const initialState = {
  effFITax: { val: '$0.00', class: '' },
  effFTax: { val: '$0.00', class: '' },
  effSTax: { val: '$0.00', class: '' },
  effLTax: { val: '$0.00', class: '' },
}

export default function tax(state = initialState, action) {
  switch (action.type) {
    case FINANCE_CALC_TAX:
      return {
        ...state,
        effFITax: action.effFITax,
        effFTax: action.effFTax,
        effSTax: action.effSTax,
        effLTax: action.effLTax,
      }
    default:
      return state
  }
}
