import NumberFormatService from '../service/NumberFormatService'

const SOCIAL_SECURITY_MAX_TAXABLE = 142800
const SOCIAL_SECURITY_TAX_RATE = .062
const MEDICARE_TAX_RATE = 0.0145

export const FINANCE_POP_TAX = 'FINANCE_POP_TAX'

export const financePopTax = (effFicaTax, effFedTax, effStateTax, effLocalTax, totalTax) => ({
    type: FINANCE_POP_TAX,
    effFITax: { val: NumberFormatService.toCurrency(effFicaTax), class: NumberFormatService.getColorClass(effFicaTax)},
    effFTax: { val: NumberFormatService.toCurrency(effFedTax), class: NumberFormatService.getColorClass(effFedTax)},
    effSTax: { val: NumberFormatService.toCurrency(effStateTax), class: NumberFormatService.getColorClass(effStateTax)},
    effLTax: { val: NumberFormatService.toCurrency(effLocalTax), class: NumberFormatService.getColorClass(effLocalTax)},
    totalTax: { val: NumberFormatService.toCurrency(totalTax), class: NumberFormatService.getColorClass(totalTax)},
})

export function financeCalcTax(gIncome, ficaTaxable, agi) {
  return dispatch => {
    var effFicaTax = calcFicaTax(ficaTaxable)
    var effFedTax = calcFederalTax(agi)
    var effStateTax = calcStateTax(agi)
    var effLocalTax = calcLocalTax(agi)
    var totalTax = effFicaTax + effFedTax + effStateTax + effLocalTax
    dispatch(financePopTax(effFicaTax, effFedTax, effStateTax, effLocalTax, totalTax))

    return totalTax
  }
}

function calcFicaTax(ficaTaxable) {
  var socialSecurityTax = -1 * Math.min(ficaTaxable, SOCIAL_SECURITY_MAX_TAXABLE) * SOCIAL_SECURITY_TAX_RATE
  var medicareTax = -1 * ficaTaxable * MEDICARE_TAX_RATE

  return socialSecurityTax + medicareTax
}

function calcFederalTax(agi) {
  return agi * -.0527
}

function calcStateTax(agi) {
  return agi * -.0316
}

function calcLocalTax(agi) {
  return agi * -.0205
}
