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

export const financeUpdateCalculations = (income1, healthcare, emplHsa, hsa, emplT401k, t401k, gIncome, nIncome,) => ({
    type: ACTION_TYPES.FINANCE_UPDATE_CALCULATIONS,
    income1: income1,
    healthcare: healthcare,
    emplHsa: emplHsa,
    hsa: hsa,
    emplT401k: emplT401k,
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
      emplHsa: state.finance.income.emplHsa.val,
      hsa: state.finance.income.hsa.val,
      emplT401k: state.finance.income.emplT401k.val,
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(value, values.healthcare, values.emplHsa, values.hsa, values.emplT401k, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterHealthcare(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: NumberFormatService.toNegNumber(value),
      emplHsa: state.finance.income.emplHsa.val,
      hsa: state.finance.income.hsa.val,
      emplT401k: state.finance.income.emplT401k.val,
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, value, values.emplHsa, values.hsa, values.emplT401k, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterEmplHsa(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      emplHsa: NumberFormatService.toNumber(value),
      hsa: state.finance.income.hsa.val,
      emplT401k: state.finance.income.emplT401k.val,
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.healthcare, value, values.hsa, values.emplT401k, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterHsa(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      emplHsa: state.finance.income.emplHsa.val,
      hsa: NumberFormatService.toNumber(value),
      emplT401k: state.finance.income.emplT401k.val,
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.healthcare, values.emplHsa, value, values.emplT401k, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterEmplT401k(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      emplHsa: state.finance.income.emplHsa.val,
      hsa: state.finance.income.hsa.val,
      emplT401k: NumberFormatService.toNumber(value),
      t401k: state.finance.income.t401k.val,
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.healthcare, values.emplHsa, values.hsa, value, values.t401k, values.income1, nIncome))
  }
}

export function financeEnterT401k(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      emplHsa: state.finance.income.emplHsa.val,
      hsa: state.finance.income.hsa.val,
      emplT401k: state.finance.income.emplT401k.val,
      t401k: NumberFormatService.toNumber(value),
    }
    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.income1, ficaTaxable, agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.healthcare, values.emplHsa, values.hsa, values.emplT401k, value, values.income1, nIncome))
  }
}

function calcAgi(values) {
  return values.income1 + values.healthcare - values.hsa - values.t401k
}

function calcFicaTaxable(values) {
  return values.income1 + values.healthcare - values.hsa
}
