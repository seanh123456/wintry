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
  tIra: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  rIra: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  brokerage: { entry: '', editing: false, val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  
  gIncome: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  nIncome: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  gComp: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  nComp: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  nTakeHome: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
  savings: { val: 0.0, annual: '$0.00', monthly: '$0.00', paycheck: '$0.00' },
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
          val: NumberFormatService.toNumber(action.values.income1),
          annual: NumberFormatService.toCurrency(action.values.income1),
          monthly: NumberFormatService.toCurrency(action.values.income1 / 12),
          paycheck: NumberFormatService.toCurrency(action.values.income1 / 26),
        },
        healthcare: {
          ...state.healthcare,
          val: NumberFormatService.toNegNumber(action.values.healthcare),
          annual: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.values.healthcare)),
          monthly: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.values.healthcare / 12)),
          paycheck: NumberFormatService.toCurrency(NumberFormatService.toNegNumber(action.values.healthcare / 26)),
        },
        emplHsa: {
          ...state.emplHsa,
          val: NumberFormatService.toNumber(action.values.emplHsa),
          annual: NumberFormatService.toCurrency(action.values.emplHsa),
          monthly: NumberFormatService.toCurrency(action.values.emplHsa / 12),
          paycheck: NumberFormatService.toCurrency(action.values.emplHsa / 26),
        },
        hsa: {
          ...state.hsa,
          val: NumberFormatService.toNumber(action.values.hsa),
          annual: NumberFormatService.toCurrency(action.values.hsa),
          monthly: NumberFormatService.toCurrency(action.values.hsa / 12),
          paycheck: NumberFormatService.toCurrency(action.values.hsa / 26),
        },
        emplT401k: {
          ...state.emplT401k,
          val: NumberFormatService.toNumber(action.values.emplT401k),
          annual: NumberFormatService.toCurrency(action.values.emplT401k),
          monthly: NumberFormatService.toCurrency(action.values.emplT401k / 12),
          paycheck: NumberFormatService.toCurrency(action.values.emplT401k / 26),
        },
        t401k: {
          ...state.t401k,
          val: NumberFormatService.toNumber(action.values.t401k),
          annual: NumberFormatService.toCurrency(action.values.t401k),
          monthly: NumberFormatService.toCurrency(action.values.t401k / 12),
          paycheck: NumberFormatService.toCurrency(action.values.t401k / 26),
        },
        tIra: {
          ...state.tIra,
          val: NumberFormatService.toNumber(action.values.tIra),
          annual: NumberFormatService.toCurrency(action.values.tIra),
          monthly: NumberFormatService.toCurrency(action.values.tIra / 12),
          paycheck: NumberFormatService.toCurrency(action.values.tIra / 26),
        },
        rIra: {
          ...state.rIra,
          val: NumberFormatService.toNumber(action.values.rIra),
          annual: NumberFormatService.toCurrency(action.values.rIra),
          monthly: NumberFormatService.toCurrency(action.values.rIra / 12),
          paycheck: NumberFormatService.toCurrency(action.values.rIra / 26),
        },
        brokerage: {
          ...state.brokerage,
          val: NumberFormatService.toNumber(action.values.brokerage),
          annual: NumberFormatService.toCurrency(action.values.brokerage),
          monthly: NumberFormatService.toCurrency(action.values.brokerage / 12),
          paycheck: NumberFormatService.toCurrency(action.values.brokerage / 26),
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
        gComp: {
          val: NumberFormatService.toNumber(action.gComp),
          annual: NumberFormatService.toCurrency(action.gComp),
          monthly: NumberFormatService.toCurrency(action.gComp / 12),
          paycheck: NumberFormatService.toCurrency(action.gComp / 26),
        },
        nComp: {
          val: NumberFormatService.toNumber(action.nComp),
          annual: NumberFormatService.toCurrency(action.nComp),
          monthly: NumberFormatService.toCurrency(action.nComp / 12),
          paycheck: NumberFormatService.toCurrency(action.nComp / 26),
        },
        nTakeHome: {
          val: NumberFormatService.toNumber(action.nTakeHome),
          annual: NumberFormatService.toCurrency(action.nTakeHome),
          monthly: NumberFormatService.toCurrency(action.nTakeHome / 12),
          paycheck: NumberFormatService.toCurrency(action.nTakeHome / 26),
        },
        savings: {
          val: NumberFormatService.toNumber(action.savings),
          annual: NumberFormatService.toCurrency(action.savings),
          monthly: NumberFormatService.toCurrency(action.savings / 12),
          paycheck: NumberFormatService.toCurrency(action.savings / 26),
        },
      }
    default:
      return state
  }
}
