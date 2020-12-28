import NumberFormatService from '../service/NumberFormatService'

import {
  FINANCE_EDIT_INCOME,
  FINANCE_EDIT_HEALTHCARE,
  FINANCE_EDIT_HSA,
  FINANCE_UPDATE_INCOME,
  FINANCE_UPDATE_HEALTHCARE,
  FINANCE_UPDATE_HSA,
  FINANCE_DISPLAY_INCOME,
  FINANCE_DISPLAY_HEALTHCARE,
  FINANCE_DISPLAY_HSA,
  FINANCE_UPDATE_CALCULATIONS,
} from '../actions/income'

const initialState = {
  income1: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  healthcare: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  hsa: { entry: '', editing: false, val: 0.0, display: '$0.00', class: '' },
  gIncome: { val: 0.0, display: '$0.00', class: '' },
  nIncome: { val: 0.0, display: '$0.00', class: '' },
}

export default function inputs(state = initialState, action) {
  switch (action.type) {
    case FINANCE_EDIT_INCOME:
      return {
        ...state,
        income1: {
          ...state.income1,
          editing: true
        },
      }
    case FINANCE_EDIT_HEALTHCARE:
      return {
        ...state,
        healthcare: {
          ...state.healthcare,
          editing: true
        },
      }
    case FINANCE_EDIT_HSA:
      return {
        ...state,
        hsa: {
          ...state.hsa,
          editing: true
        },
      }
    case FINANCE_UPDATE_INCOME:
      return {
        ...state,
        income1: {
          ...state.income1,
          entry: action.income1,
        },
      }
    case FINANCE_UPDATE_HEALTHCARE:
      return {
        ...state,
        healthcare: {
          ...state.healthcare,
          entry: action.healthcare,
        },
      }
    case FINANCE_UPDATE_HSA:
      return {
        ...state,
        hsa: {
          ...state.hsa,
          entry: action.hsa,
        },
      }
    case FINANCE_DISPLAY_INCOME:
      return {
        ...state,
        income1: {
          ...state.income1,
          entry: NumberFormatService.toEntry(state.income1.val),
          editing: false,
        },
      }
    case FINANCE_DISPLAY_HEALTHCARE:
      return {
        ...state,
        healthcare: {
          ...state.healthcare,
          entry: NumberFormatService.toEntry(state.healthcare.val),
          editing: false,
        },
      }
    case FINANCE_DISPLAY_HSA:
      return {
        ...state,
        hsa: {
          ...state.hsa,
          entry: NumberFormatService.toEntry(state.hsa.val),
          editing: false,
        },
      }
    case FINANCE_UPDATE_CALCULATIONS:
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
