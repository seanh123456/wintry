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

export const financeUpdateCalculations = (values, nIncome, gComp, nComp, nTakeHome, savings,) => ({
    type: ACTION_TYPES.FINANCE_UPDATE_CALCULATIONS,
    values: values,
    gIncome: values.taxable,
    nIncome: nIncome,
    gComp: gComp,
    nComp: nComp,
    nTakeHome: nTakeHome,
    savings: savings,
})


export function financeEnterEntry(name, value) {
  return (dispatch, getState) => {
    dispatch(financeUpdateEntry(name, value))

    var values = getValues(getState())
    values.[name] = NumberFormatService.toNumber(value)

    var agi = calcAgi(values)
    var ficaTaxable = calcFicaTaxable(values)
    var totalTax = dispatch(financeCalcTax(values.taxable, ficaTaxable, agi, values.capitalGains))
    var nIncome = agi + values.nonTaxable + values.capitalGains + totalTax
    var gComp = values.taxable + values.nonTaxable + values.capitalGains + values.emplHsa + values.emplT401k
    var nComp = gComp + totalTax + values.healthcare
    var nTakeHome = nIncome - values.rIra - values.brokerage
    var savings = values.emplHsa + values.hsa + values.emplT401k + values.t401k + values.tIra + values.rIra + values.brokerage

    values.[name] = value
    dispatch(financeUpdateCalculations(values, nIncome, gComp, nComp, nTakeHome, savings))
  }
}

function getValues(state) {
  return {
    taxable: state.finance.income.taxable.val,
    nonTaxable: state.finance.income.nonTaxable.val,
    capitalGains: state.finance.income.capitalGains.val,
    healthcare: state.finance.income.healthcare.val,
    emplHsa: state.finance.income.emplHsa.val,
    hsa: state.finance.income.hsa.val,
    emplT401k: state.finance.income.emplT401k.val,
    t401k: state.finance.income.t401k.val,
    tIra: state.finance.income.tIra.val,
    rIra: state.finance.income.rIra.val,
    brokerage: state.finance.income.brokerage.val,
  }
}

function calcAgi(values) {
  return values.taxable + values.healthcare - values.hsa - values.t401k - values.tIra
}

function calcFicaTaxable(values) {
  return values.taxable + values.healthcare - values.hsa
}
