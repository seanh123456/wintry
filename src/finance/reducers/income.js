import NumberFormatService from '../service/NumberFormatService'

import {
  ACTION_TYPES,
} from '../actions/income'

const initialState = {
  income1: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  healthcare: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  emplHsa: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  hsa: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  emplT401k: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  t401k: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  gIncome: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  nIncome: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
}

export default function inputs(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.FINANCE_EDIT_ENTRY:
      return {
        ...state,
        [action.name]: {
          ...state.[action.name],
          editing: true
        },
      }
    case ACTION_TYPES.FINANCE_UPDATE_ENTRY:
      return {
        ...state,
        [action.name]: {
          ...state.[action.name],
          entry: action.value,
        },
      }
    case ACTION_TYPES.FINANCE_DISPLAY_ENTRY:
      return {
        ...state,
        [action.name]: {
          ...state.[action.name],
          entry: NumberFormatService.toEntry(state.[action.name].val),
          editing: false,
        },
      }
    case ACTION_TYPES.FINANCE_UPDATE_CALCULATIONS:
      return {
        ...state,
        income1: {
          ...state.income1,
          val: NumberFormatService.toNumber(action.income1),
          annual: NumberFormatService.toCurrency(action.income1),
          monthly: NumberFormatService.toCurrency(action.income1 / 12),
          paycheck: NumberFormatService.toCurrency(action.income1 / 26),
        },
        healthcare: {
          ...state.healthcare,
          val: NumberFormatService.toNegNumber(action.healthcare),
          annual: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.healthcare)),
          monthly: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.healthcare / 12)),
          paycheck: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.healthcare / 26)),
        },
        emplHsa: {
          ...state.emplHsa,
          val: NumberFormatService.toNumber(action.emplHsa),
          annual: NumberFormatService.toCurrency(action.emplHsa),
          monthly: NumberFormatService.toCurrency(action.emplHsa / 12),
          paycheck: NumberFormatService.toCurrency(action.emplHsa / 26),
        },
        hsa: {
          ...state.hsa,
          val: NumberFormatService.toNumber(action.hsa),
          annual: NumberFormatService.toCurrency(action.hsa),
          monthly: NumberFormatService.toCurrency(action.hsa / 12),
          paycheck: NumberFormatService.toCurrency(action.hsa / 26),
        },
        emplT401k: {
          ...state.emplT401k,
          val: NumberFormatService.toNumber(action.emplT401k),
          annual: NumberFormatService.toCurrency(action.emplT401k),
          monthly: NumberFormatService.toCurrency(action.emplT401k / 12),
          paycheck: NumberFormatService.toCurrency(action.emplT401k / 26),
        },
        t401k: {
          ...state.t401k,
          val: NumberFormatService.toNumber(action.t401k),
          annual: NumberFormatService.toCurrency(action.t401k),
          monthly: NumberFormatService.toCurrency(action.t401k / 12),
          paycheck: NumberFormatService.toCurrency(action.t401k / 26),
        },
        gIncome: {
          val: NumberFormatService.toNumber(action.gIncome),
          annual: NumberFormatService.toCurrency(action.gIncome),
          monthly: NumberFormatService.toCurrency(action.gIncome / 12),
          paycheck: NumberFormatService.toCurrency(action.gIncome / 26),
        },
        nIncome: {
          val: NumberFormatService.toNumber(action.nIncome),
          annual: NumberFormatService.toCurrency(action.nIncome),
          monthly: NumberFormatService.toCurrency(action.nIncome / 12),
          paycheck: NumberFormatService.toCurrency(action.nIncome / 26),
        },
      }
    default:
      return state
  }
}
