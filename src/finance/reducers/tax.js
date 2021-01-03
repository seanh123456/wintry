import {
  FINANCE_POP_TAX,
} from '../actions/tax'

const initialState = {
  ficaTax: { annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  federalTax: { annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  stateTax: { annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  localTax: { annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  totalTax: { annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
}

export default function tax(state = initialState, action) {
  switch (action.type) {
    case FINANCE_POP_TAX:
      return {
        ...state,
        ficaTax: action.ficaTax,
        federalTax: action.federalTax,
        stateTax: action.stateTax,
        localTax: action.localTax,
        totalTax: action.totalTax,
      }
    default:
      return state
  }
}
