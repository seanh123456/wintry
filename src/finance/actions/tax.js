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

export const financePopTax = (ficaTax, federalTax, stateTax, localTax, totalTax) => ({
    type: FINANCE_POP_TAX,
    ficaTax: {
      annual: NumberFormatService.toCurrency(ficaTax),
      monthly: NumberFormatService.toCurrency(ficaTax / 12),
      paycheck: NumberFormatService.toCurrency(ficaTax / 26),
      class: NumberFormatService.getColorClass(ficaTax),
    },
    federalTax: {
      annual: NumberFormatService.toCurrency(federalTax),
      monthly: NumberFormatService.toCurrency(federalTax / 12),
      paycheck: NumberFormatService.toCurrency(federalTax / 26),
      class: NumberFormatService.getColorClass(federalTax),
    },
    stateTax: {
      annual: NumberFormatService.toCurrency(stateTax),
      monthly: NumberFormatService.toCurrency(stateTax / 12),
      paycheck: NumberFormatService.toCurrency(stateTax / 26),
      class: NumberFormatService.getColorClass(stateTax),
    },
    localTax: {
      annual: NumberFormatService.toCurrency(localTax),
      monthly: NumberFormatService.toCurrency(localTax / 12),
      paycheck: NumberFormatService.toCurrency(localTax / 26),
      class: NumberFormatService.getColorClass(localTax),
    },
    totalTax: {
      annual: NumberFormatService.toCurrency(totalTax),
      monthly: NumberFormatService.toCurrency(totalTax / 12),
      paycheck: NumberFormatService.toCurrency(totalTax / 26),
      class: NumberFormatService.getColorClass(totalTax),
    },
})

export function financeCalcTax(gIncome, ficaAgi, agi) {
  return dispatch => {
    var ficaTax = calcFicaTax('mfj', ficaAgi)
    var federalAgi = calcFederalAgi('mfj', agi)
    var federalTax = calcFederalTax('mfj', federalAgi)
    var stateAgi = calcStateAgi('mfj', federalAgi, agi)
    var stateTax = calcStateTax('mfj', stateAgi)
    var localTax = calcLocalTax('mfj', stateAgi)
    var totalTax = ficaTax + federalTax + stateTax + localTax
    dispatch(financePopTax(ficaTax, federalTax, stateTax, localTax, totalTax))

    return totalTax
  }
}

function calcFicaTax(filingStatus, ficaAgi) {
  var socialSecurityTax = -1 * Math.min(ficaAgi, SOCIAL_SECURITY_MAX_TAXABLE) * SOCIAL_SECURITY_TAX_RATE
  var medicareTax = -1 * ficaAgi * MEDICARE_TAX_RATE

  return socialSecurityTax + medicareTax
}

function calcFederalAgi(filingStatus, federalAgi) {
  return Math.max(federalAgi - FEDERAL_STANDARD_DEDUCTION * 2, 0)
}

function calcFederalTax(filingStatus, federalAgi) {
  var fedTax = calculateTax(federalAgi, fedBrackets)

  var numChildren = 1
  fedTax += numChildren * 2000

  return fedTax
}

function calcStateAgi(filingStatus, federalAgi, agi) {
  var stateDeduction = Math.min(Math.max(agi * .15, 3100), 4600)

  var stateExemption = 0
  var numExemptions = 3;

  if (federalAgi <= 150000) {
    stateExemption = 3200
  } else if (federalAgi > 150000 && federalAgi <= 175000) {
    stateExemption = 1600
  } else if (federalAgi > 175000 && federalAgi <= 200000) {
    stateExemption = 800
  }

  return Math.max(agi - stateDeduction - stateExemption * numExemptions, 0)
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
