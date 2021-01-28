const SOCIAL_SECURITY_MAX_TAXABLE = 142800
const SOCIAL_SECURITY_TAX_RATE = 0.062
const MEDICARE_TAX_RATE = 0.0145
const ADDITIONAL_MEDICARE_TAX_THRESHOLD = 250000
const ADDITIONAL_MEDICARE_TAX_RATE = 0.009
const FEDERAL_STANDARD_DEDUCTION = 12550
const FEDERAL_CHILD_CREDIT_NONREFUNDABLE = 600
const FEDERAL_CHILD_CREDIT_REFUNDABLE = 1400
const FEDERAL_BRACKETS = [
  { limit:  19900, percent: 0.10 },
  { limit:  81050, percent: 0.12 },
  { limit: 172750, percent: 0.22 },
  { limit: 329850, percent: 0.24 },
  { limit: 418850, percent: 0.32 },
  { limit: 628300, percent: 0.35 },
  { limit:   1e10, percent: 0.37 },
]
const FEDERAL_GAINS_BRACKETS = [
  { limit:  80800, percent: 0.0 },
  { limit:  501600, percent: 0.15 },
  { limit:   1e10, percent: 0.20 },
]
const NET_INVESTMENT_TAX_THRESHOLD = 250000
const NET_INVESTMENT_TAX_RATE = 0.038
const STATE_BRACKETS = [
  { limit:   1000, percent: 0.02 },
  { limit:   2000, percent: 0.03 },
  { limit:   3000, percent: 0.04 },
  { limit: 150000, percent: 0.0475 },
  { limit: 175000, percent: 0.05 },
  { limit: 225000, percent: 0.0525 },
  { limit: 300000, percent: 0.055 },
  { limit:   1e10, percent: 0.0575 },
]
const LOCAL_TAX_RATE = 0.0303

export const FINANCE_POP_TAX = 'FINANCE_POP_TAX'

export const financePopTax = (name, tax, effective, marginal) => ({
    type: FINANCE_POP_TAX,
    name: name,
    tax: tax,
    effective: effective,
    marginal: marginal,
})

export function financeCalcTax(gIncome, ficaAgi, agi, capitalGains) {
  return dispatch => {
    var federalTaxable = calcFederalTaxable('mfj', agi)
    var stateTaxable = calcStateTaxable('mfj', federalTaxable, agi)

    var incomeTaxes = {}
    incomeTaxes['ficaTax'] = calcFicaTax('mfj', gIncome, ficaAgi)
    incomeTaxes['federalTax'] = calcFederalTax('mfj', gIncome, federalTaxable)
    incomeTaxes['stateTax'] = calcStateTax('mfj', gIncome, stateTaxable)
    incomeTaxes['localTax'] = calcLocalTax('mfj', gIncome, stateTaxable)

    var capitalGainsTaxes = {}
    capitalGainsTaxes['federalGainsTax'] = calcFederalGainsTax('mfj', federalTaxable, capitalGains)
    capitalGainsTaxes['stateGainsTax'] = calcStateGainsTax('mfj', stateTaxable, capitalGains)
    capitalGainsTaxes['localGainsTax'] = calcLocalGainsTax('mfj', capitalGains)

    var totalTax = 0;
    var totalEffective = 0;
    var totalMarginal = 0;
    for (const taxName in incomeTaxes) {
      var tax = incomeTaxes[taxName]
      totalTax += tax.tax
      totalEffective += tax.effective
      totalMarginal += tax.marginal
      dispatch(financePopTax(tax.name, tax.tax, tax.effective, tax.marginal))
    }
    dispatch(financePopTax('totalTax', totalTax, totalEffective, totalMarginal))

    return totalTax
  }
}

function calcFederalTaxable(filingStatus, agi) {
  return Math.max(agi - FEDERAL_STANDARD_DEDUCTION * 2, 0)
}

function calcStateTaxable(filingStatus, gIncome, agi) {
  var stateDeduction = Math.min(Math.max(agi * .15, 3200), 4650)

  var stateExemption = 0
  var numExemptions = 3;

  if (gIncome <= 150000) {
    stateExemption = 3200
  } else if (gIncome > 150000 && gIncome <= 175000) {
    stateExemption = 1600
  } else if (gIncome > 175000 && gIncome <= 200000) {
    stateExemption = 800
  }

  return Math.max(agi - stateDeduction - stateExemption * numExemptions, 0)
}

function calcFicaTax(filingStatus, gIncome, ficaAgi) {
  var socialSecurityTax = -1 * Math.min(ficaAgi, SOCIAL_SECURITY_MAX_TAXABLE) * SOCIAL_SECURITY_TAX_RATE
  var medicareTax = -1 * ficaAgi * MEDICARE_TAX_RATE

  var marginalTax = Math.abs(ficaAgi) < SOCIAL_SECURITY_MAX_TAXABLE ? SOCIAL_SECURITY_TAX_RATE : 0
  marginalTax += MEDICARE_TAX_RATE

  if (ficaAgi > ADDITIONAL_MEDICARE_TAX_THRESHOLD) {
    medicareTax += -1 * (ficaAgi - ADDITIONAL_MEDICARE_TAX_THRESHOLD) * ADDITIONAL_MEDICARE_TAX_RATE
    marginalTax += ADDITIONAL_MEDICARE_TAX_RATE
  }

  var ficaTax = socialSecurityTax + medicareTax


  return { name: 'ficaTax', tax: ficaTax, effective: -1 * ficaTax / gIncome, marginal: marginalTax, }
}

function calcFederalTax(filingStatus, gIncome, federalAgi) {
  var fed = calculateTax(federalAgi, FEDERAL_BRACKETS)

  var numChildren = 1

  // Non refundable credit cannot reduce liability below 0
  fed.tax += numChildren * FEDERAL_CHILD_CREDIT_NONREFUNDABLE
  fed.tax = Math.min(fed.tax, 0)

  // Refundable credit can reduce liability below 0
  fed.tax += numChildren * FEDERAL_CHILD_CREDIT_REFUNDABLE

  var effective = 0.0
  if (gIncome !== 0.0) effective = -1 * fed.tax / gIncome

  return { name: 'federalTax', tax: fed.tax, effective: effective, marginal: fed.marginal, }
}

function calcStateTax(filingStatus, gIncome, stateAgi) {
  var state = calculateTax(stateAgi, STATE_BRACKETS)

  return { name: 'stateTax', tax: state.tax, effective: -1 * state.tax / gIncome, marginal: state.marginal }
}

function calcLocalTax(filingStatus, gIncome, stateTaxable) {
  var localTax = -1 * stateTaxable * LOCAL_TAX_RATE
  var localMarginal = stateTaxable > 0 ? LOCAL_TAX_RATE : 0

  return { name: 'localTax', tax: localTax, effective: -1 * localTax / gIncome, marginal: localMarginal }
}

function calcFederalGainsTax(filingStatus, federalTaxable, capitalGains) {
  var adjustedGainsBracket = []

  for (const bracket in FEDERAL_GAINS_BRACKETS) {
    adjustedGainsBracket.push( { limit: Math.max(FEDERAL_GAINS_BRACKETS[bracket].limit - federalTaxable, 0), percent: FEDERAL_GAINS_BRACKETS[bracket].percent } )
  }

  var fedGains = calculateTax(capitalGains, adjustedGainsBracket)

  if (federalTaxable + capitalGains > NET_INVESTMENT_TAX_THRESHOLD) {
    var diff = Math.max(NET_INVESTMENT_TAX_THRESHOLD - federalTaxable, 0)
    fedGains.tax += -1 * NET_INVESTMENT_TAX_RATE * (capitalGains - diff)
    fedGains.marginal += NET_INVESTMENT_TAX_RATE
  }

  return { name: 'federalGainsTax', tax: fedGains.tax, effective: -1 * fedGains.tax / capitalGains, marginal: fedGains.marginal, }
}

function calcStateGainsTax(filingStatus, stateTaxable, capitalGains) {
  var adjustedGainsBracket = []

  for (const bracket in STATE_BRACKETS) {
    adjustedGainsBracket.push( { limit: Math.max(STATE_BRACKETS[bracket].limit - stateTaxable, 0), percent: STATE_BRACKETS[bracket].percent } )
  }

  var stateGains = calculateTax(capitalGains, adjustedGainsBracket)

  return { name: 'federalGainsTax', tax: stateGains.tax, effective: -1 * stateGains.tax / capitalGains, marginal: stateGains.marginal, }
}

function calcLocalGainsTax(filingStatus, capitalGains) {
  var localTax = -1 * capitalGains * LOCAL_TAX_RATE
  var localMarginal = capitalGains > 0 ? LOCAL_TAX_RATE : 0

  return { name: 'localGainsTax', tax: localTax, effective: -1 * localTax / capitalGains, marginal: localMarginal }
}

function calculateTax(taxableIncome, taxBrackets) {
  var tax = 0.0
  var marginal = taxBrackets[0].percent

  tax += -1 * Math.max(Math.min(taxBrackets[0].limit, taxableIncome), 0) * taxBrackets[0].percent
  for (var i = 1; i < taxBrackets.length; i ++) {
    tax += -1 * Math.max(Math.min(taxBrackets[i].limit, taxableIncome) - taxBrackets[i - 1].limit, 0) * taxBrackets[i].percent
    if (taxableIncome >= taxBrackets[i - 1].limit) marginal = taxBrackets[i].percent
  }

  return { tax: tax, marginal: marginal };
}
