import NumberFormatService from '../service/NumberFormatService'

import {
  ACTION_TYPES,
} from '../actions/income'

const initialState = {
  income1: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  healthcare: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  hsa: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  t401k: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  gIncome: { val: 0.0, display: '$0.00', class: '' },
  nIncome: { val: 0.0, display: '$0.00', class: '' },
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
          display: NumberFormatService.toCurrency(action.income1),
          class: NumberFormatService.getColorClass(action.income1),
        },
        healthcare: {
          ...state.healthcare,
          val: NumberFormatService.toNegNumber(action.healthcare),
          display: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.healthcare)),
          class: NumberFormatService.getColorClass(NumberFormatService.toNegNumber(action.healthcare)),
        },
        hsa: {
          ...state.hsa,
          val: NumberFormatService.toNumber(action.hsa),
          display: NumberFormatService.toCurrency(action.hsa),
          class: NumberFormatService.getColorClass(action.hsa),
        },
        t401k: {
          ...state.t401k,
          val: NumberFormatService.toNumber(action.t401k),
          display: NumberFormatService.toCurrency(action.t401k),
          class: NumberFormatService.getColorClass(action.t401k),
        },
        gIncome: {
          val: NumberFormatService.toNumber(action.gIncome),
          display: NumberFormatService.toCurrency(action.gIncome),
          class: NumberFormatService.getColorClass(action.gIncome),
        },
        nIncome: {
          val: NumberFormatService.toNumber(action.nIncome),
          display: NumberFormatService.toCurrency(action.nIncome),
          class: NumberFormatService.getColorClass(action.nIncome),
        },
      }
    default:
      return state
  }
}
