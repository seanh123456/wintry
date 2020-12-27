import { financeCalcTax } from '../actions/tax'
import NumberFormatService from '../service/NumberFormatService'

export const FINANCE_EDIT_INCOME = 'FINANCE_EDIT_INCOME'
export const FINANCE_EDIT_HEALTHCARE = 'FINANCE_EDIT_HEALTHCARE'
export const FINANCE_EDIT_HSA = 'FINANCE_EDIT_HSA'
export const FINANCE_UPDATE_INCOME = 'FINANCE_UPDATE_INCOME'
export const FINANCE_UPDATE_HEALTHCARE = 'FINANCE_UPDATE_HEALTHCARE'
export const FINANCE_UPDATE_HSA = 'FINANCE_UPDATE_HSA'

export const financeEditIncome = income1 => ({
    type: FINANCE_EDIT_INCOME,
    income1: {
      val: (income1 === '' || NumberFormatService.toNumber(income1) === 0) ? '' : NumberFormatService.toNumber(income1),
      class: NumberFormatService.getColorClass(NumberFormatService.toNumber(income1)),
    },
})

export const financeEditHealthcare = healthcare => ({
    type: FINANCE_EDIT_HEALTHCARE,
    income1: {
      val: (income1 === '' || NumberFormatService.toNumber(income1) === 0) ? '' : NumberFormatService.toNumber(income1),
      class: NumberFormatService.getColorClass(NumberFormatService.toNumber(income1)),
    },
})

export const financeEditHsa = income1 => ({
    type: FINANCE_EDIT_HSA,
    income1: {
      val: (income1 === '' || NumberFormatService.toNumber(income1) === 0) ? '' : NumberFormatService.toNumber(income1),
      class: NumberFormatService.getColorClass(NumberFormatService.toNumber(income1)),
    },
})

export const financeUpdateIncome = (income1, gIncome, nIncome) => ({
    type: FINANCE_UPDATE_INCOME,
    income1: { val: income1, class: NumberFormatService.getColorClass(income1), },
    gIncome: { val: gIncome, class: NumberFormatService.getColorClass(gIncome), },
    nIncome: { val: nIncome, class: NumberFormatService.getColorClass(nIncome), },
})

export const financeFormatIncome = (income1, gIncome, nIncome) => ({
    type: FINANCE_UPDATE_INCOME,
    income1: { val: NumberFormatService.toCurrency(income1), class: NumberFormatService.getColorClass(income1), },
    gIncome: { val: NumberFormatService.toCurrency(gIncome), class: NumberFormatService.getColorClass(gIncome), },
    nIncome: { val: NumberFormatService.toCurrency(nIncome), class: NumberFormatService.getColorClass(nIncome), },
})

export function financeEnterIncome(input) {
  return dispatch => {
    var agi = Number(input.income1) - Number(input.healthcare) - Number(input.hsa)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateIncome(income1, gIncome, nIncome))
  }
}

export function financeEnterHealthcare(input) {
  return dispatch => {
    var agi = Number(input.income1) - Number(input.healthcare) - Number(input.hsa)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateIncome(income1, gIncome, nIncome))
  }
}

export function financeEnterHsa(input) {
  return dispatch => {
    var agi = Number(input.income1) - Number(input.healthcare) - Number(input.hsa)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeUpdateIncome(income1, gIncome, nIncome))
  }
}

export function financeCalcIncome(input) {
  return dispatch => {
    var agi = Number(input.income1) - Number(input.healthcare) - Number(input.hsa)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeFormatIncome(income1, gIncome, nIncome))
  }
}

export function financeCalcHealthcare(input) {
  return dispatch => {
    var agi = Number(input.income1) - Number(input.healthcare) - Number(input.hsa)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeFormatIncome(income1, gIncome, nIncome))
  }
}

export function financeCalcIncome(input) {
  return dispatch => {
    var agi = Number(input.income1) - Number(input.healthcare) - Number(input.hsa)
    var totalTax = dispatch(financeCalcTax(agi))
    var nIncome = agi + totalTax
    dispatch(financeFormatIncome(income1, gIncome, nIncome))
  }
}
