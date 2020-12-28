import { financeCalcTax } from '../actions/tax'
import NumberFormatService from '../service/NumberFormatService'

export const FINANCE_EDIT_INCOME = 'FINANCE_EDIT_INCOME'
export const FINANCE_EDIT_HEALTHCARE = 'FINANCE_EDIT_HEALTHCARE'
export const FINANCE_EDIT_HSA = 'FINANCE_EDIT_HSA'
export const FINANCE_UPDATE_INCOME = 'FINANCE_UPDATE_INCOME'
export const FINANCE_UPDATE_HEALTHCARE = 'FINANCE_UPDATE_HEALTHCARE'
export const FINANCE_UPDATE_HSA = 'FINANCE_UPDATE_HSA'
export const FINANCE_DISPLAY_INCOME = 'FINANCE_DISPLAY_INCOME'
export const FINANCE_DISPLAY_HEALTHCARE = 'FINANCE_DISPLAY_HEALTHCARE'
export const FINANCE_DISPLAY_HSA = 'FINANCE_DISPLAY_HSA'
export const FINANCE_UPDATE_CALCULATIONS = 'FINANCE_UPDATE_CALCULATIONS'

export const financeEditIncome = () => ({
    type: FINANCE_EDIT_INCOME,
})

export const financeEditHealthcare = () => ({
    type: FINANCE_EDIT_HEALTHCARE,
})

export const financeEditHsa = () => ({
    type: FINANCE_EDIT_HSA,
})

export const financeUpdateIncome = income1 => ({
    type: FINANCE_UPDATE_INCOME,
})

export const financeUpdateHealthcare = healthcare => ({
    type: FINANCE_UPDATE_HEALTHCARE,
})

export const financeUpdateHsa = hsa => ({
    type: FINANCE_UPDATE_HSA,
})

export const financeDisplayIncome = () => ({
    type: FINANCE_DISPLAY_INCOME,
})

export const financeDisplayHealthcare = () => ({
    type: FINANCE_DISPLAY_HEALTHCARE,
})

export const financeDisplayHsa = () => ({
    type: FINANCE_DISPLAY_HSA,
})

export const financeUpdateCalculations = (income1, gIncome, nIncome, healthcare, hsa) => ({
    type: FINANCE_UPDATE_CALCULATIONS,
    income1: income1,
    healthcare: healthcare,
    hsa: hsa,
    gIncome: gIncome,
    nIncome: nIncome,
})

export function financeEnterIncome(income1) {
  return (dispatch, getState) => {
    dispatch(financeUpdateIncome(income1))
    var state = getState()
    var values = {
      income1: NumberFormatService.toNumber(income1),
      healthcare: state.finance.income.healthcare.val,
      hsa: state.finance.income.hsa.val,
    }
    var agi = calcAgi(values)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(income1, values.income1, nIncome, values.healthcare, values.hsa))
  }
}

export function financeEnterHealthcare(healthcare) {
  return (dispatch, getState) => {
    dispatch(financeUpdateHealthcare(healthcare))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: NumberFormatService.toNegNumber(healthcare),
      hsa: state.finance.income.hsa.val,
    }
    var agi = calcAgi(values)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.income1, nIncome, healthcare, values.hsa))
  }
}

export function financeEnterHsa(hsa) {
  return (dispatch, getState) => {
    dispatch(financeUpdateHsa(hsa))
    var state = getState()
    var values = {
      income1: state.finance.income.income1.val,
      healthcare: state.finance.income.healthcare.val,
      hsa: NumberFormatService.toNumber(hsa),
    }
    var agi = calcAgi(values)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateCalculations(values.income1, values.income1, nIncome, values.healthcare, hsa))
  }
}

function calcAgi(values) {
  return values.income1 + values.healthcare - values.hsa
}
