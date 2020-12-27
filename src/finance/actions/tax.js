import NumberFormatService from '../service/NumberFormatService'

export const FINANCE_CALC_TAX = 'FINANCE_CALC_TAX'

export const financeCalcTax = gIncome => ({
    type: FINANCE_CALC_TAX,
    effFITax: { val: NumberFormatService.toCurrency(gIncome * .13), class: NumberFormatService.getColorClass(gIncome)},
    effFTax: { val: NumberFormatService.toCurrency(gIncome * .08), class: NumberFormatService.getColorClass(gIncome)},
    effSTax: { val: NumberFormatService.toCurrency(gIncome * .05), class: NumberFormatService.getColorClass(gIncome)},
    effLTax: { val: NumberFormatService.toCurrency(gIncome * .03), class: NumberFormatService.getColorClass(gIncome)},
})
