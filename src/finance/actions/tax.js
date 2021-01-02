import NumberFormatService from '../service/NumberFormatService'

const SOCIAL_SECURITY_MAX_TAXABLE = 142800
const SOCIAL_SECURITY_TAX_RATE = .062
const MEDICARE_TAX_RATE = 0.0145
const FEDERAL_STANDARD_DEDUCTION = 12550
const fedBrackets = [
  { limit:  19900, percent: -.10 },
  { limit:  81050, percent: -.12 },
  { limit: 172750, percent: -.22 },
  { limit: 329850, percent: -.24 },
  { limit: 418850, percent: -.32 },
  { limit: 628300, percent: -.35 },
  { limit:   1e10, percent: -.37 },
]
const stateBrackets = [
  { limit:   1000, percent: -.02 },
  { limit:   2000, percent: -.03 },
  { limit:   3000, percent: -.04 },
  { limit: 150000, percent: -.0475 },
  { limit: 175000, percent: -.05 },
  { limit: 225000, percent: -.0525 },
  { limit: 300000, percent: -.055 },
  { limit:   1e10, percent: -.0575 },
]

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
    var effFicaTax = calcFicaTax('mfj', ficaTaxable)
    var federalAgi = calcFederalAgi('mfj', agi)
    var effFedTax = calcFederalTax('mfj', federalAgi)
    var stateAgi = calcStateAgi('mfj', federalAgi, agi)
    var effStateTax = calcStateTax('mfj', stateAgi)
    var effLocalTax = calcLocalTax('mfj', stateAgi)
    var totalTax = effFicaTax + effFedTax + effStateTax + effLocalTax
    dispatch(financePopTax(effFicaTax, effFedTax, effStateTax, effLocalTax, totalTax))

    return totalTax
  }
}

function calcFicaTax(filingStatus, ficaTaxable) {
  var socialSecurityTax = -1 * Math.min(ficaTaxable, SOCIAL_SECURITY_MAX_TAXABLE) * SOCIAL_SECURITY_TAX_RATE
  var medicareTax = -1 * ficaTaxable * MEDICARE_TAX_RATE

  return socialSecurityTax + medicareTax
}

function calcFederalAgi(filingStatus, federalAgi) {
  return federalAgi - FEDERAL_STANDARD_DEDUCTION * 2
}

function calcFederalTax(filingStatus, fedTaxable) {
  var fedTax = calculateTax(fedTaxable, fedBrackets)

  var numChildren = 1
  fedTax += numChildren * 2000

  return fedTax
}

function calcStateAgi(filingStatus, fedTaxable, agi) {
  var stateDeduction = Math.min(Math.max(agi * .15, 3100), 4600)

  var stateExemption = 0
  var numExemptions = 3;

  var fedTaxable = agi - FEDERAL_STANDARD_DEDUCTION * 2
  if (fedTaxable <= 150000) {
    stateExemption = 3200
  } else if (fedTaxable > 150000 && fedTaxable <= 175000) {
    stateExemption = 1600
  } else if (fedTaxable > 175000 && fedTaxable <= 200000) {
    stateExemption = 800
  }

  return agi - stateDeduction - stateExemption * numExemptions
}

function calcStateTax(filingStatus, stateAgi) {

  var stateTax = calculateTax(stateAgi, stateBrackets)

  return stateTax
}

function calcLocalTax(filingStatus, stateAgi) {
  return stateAgi * -.0305
}

function calculateTax(taxableIncome, taxBrackets) {
  var tax = 0;

  tax += Math.max(Math.min(taxBrackets[0].limit, taxableIncome), 0) * taxBrackets[0].percent
  for (var i = 1; i < taxBrackets.length; i ++) {
    tax += Math.max(Math.min(taxBrackets[i].limit, taxableIncome) - taxBrackets[i - 1].limit, 0)  * taxBrackets[i].percent
  }

  return tax;
}
