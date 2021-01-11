import NumberFormatService from '../service/NumberFormatService'

import {
  FINANCE_POP_TAX,
} from '../actions/tax'

const initialState = {
  ficaTax: { annual: '0.00', monthly: '0.00', paycheck: '0.00', effective: '0.00%', marginal: '0.00%', },
  federalTax: { annual: '0.00', monthly: '0.00', paycheck: '0.00', effective: '0.00%', marginal: '0.00%', },
  stateTax: { annual: '0.00', monthly: '0.00', paycheck: '0.00', effective: '0.00%', marginal: '0.00%', },
  localTax: { annual: '0.00', monthly: '0.00', paycheck: '0.00', effective: '0.00%', marginal: '0.00%', },
  totalTax: { annual: '0.00', monthly: '0.00', paycheck: '0.00', effective: '0.00%', marginal: '0.00%', },
}

export default function tax(state = initialState, action) {
  switch (action.type) {
    case FINANCE_POP_TAX:
      return {
        ...state,
        [action.name]: {
          ...state.[action.name],
          annual: NumberFormatService.toDisplayNum(action.tax),
          monthly: NumberFormatService.toDisplayNum(action.tax / 12),
          paycheck: NumberFormatService.toDisplayNum(action.tax / 26),
          effective: NumberFormatService.toPercentage(action.effective),
          marginal: NumberFormatService.toPercentage(action.marginal),
        },
      }
    default:
      return state
  }
}
