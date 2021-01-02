import { financeCalcTax } from '../actions/tax'
import NumberFormatService from '../service/NumberFormatService'

export const ACTION_TYPES = {
  FINANCE_EDIT_ENTRY: 'FINANCE_EDIT_ENTRY',
  FINANCE_UPDATE_ENTRY: 'FINANCE_UPDATE_ENTRY',
  FINANCE_DISPLAY_ENTRY: 'FINANCE_DISPLAY_ENTRY',
  FINANCE_UPDATE_CALCULATIONS: 'FINANCE_UPDATE_CALCULATIONS',
}

export const financeEditEntry = name => ({
    type: ACTION_TYPES.FINANCE_EDIT_ENTRY,
    name: name
})

export const financeUpdateEntry = (name, value) => ({
    type: ACTION_TYPES.FINANCE_UPDATE_ENTRY,
    name: name,
    value: value,
})

export const financeDisplayEntry = name => ({
    type: ACTION_TYPES.FINANCE_DISPLAY_ENTRY,
    name: name
})

export const financeUpdateCalculations = (income1, healthcare, hsa, t401k, gIncome, nIncome,) => ({
    type: ACTION_TYPES.FINANCE_UPDATE_CALCULATIONS,
    income1: income1,
    healthcare: healthcare,
    hsa: hsa,
    t401k: t401k,
    gIncome: gIncome,
    nIncome: nIncome,
})

export function financeEnterIncome(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: NumberFormatService.toNumber(value),
      healthcare: state.finance.income.healthcare.val,
      hsa: state.finance.income.hsa.val,
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(value, values.healthcare, values.hsa, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterHealthcare(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: NumberFormatService.toNegNumber(value),
      hsa: state.finance.income.hsa.val,
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, value, values.hsa, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterHsa(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      hsa: NumberFormatService.toNumber(value),
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.healthcare, value, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterT401k(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      hsa: state.finance.income.hsa.val,
      t401k: NumberFormatService.toNumber(value),
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.healthcare, values.hsa, value, values.income1, nIncome))
  }
}

function calcAgi(values) {
  return values.income1 + values.healthcare - values.hsa - values.t401k
}

function calcFicaTaxable(values) {
  return values.income1 + values.healthcare - values.hsa
}
