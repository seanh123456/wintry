import NumberFormatService from '../service/NumberFormatService'

export const FINANCE_POP_TAX = 'FINANCE_POP_TAX'

export const financePopTax = (effFITax, effFTax, effSTax, effLTax, totalTax) => ({
    type: FINANCE_POP_TAX,
    effFITax: { val: NumberFormatService.toCurrency(effFITax), class: NumberFormatService.getColorClass(effFITax)},
    effFTax: { val: NumberFormatService.toCurrency(effFTax), class: NumberFormatService.getColorClass(effFTax)},
    effSTax: { val: NumberFormatService.toCurrency(effSTax), class: NumberFormatService.getColorClass(effSTax)},
    effLTax: { val: NumberFormatService.toCurrency(effLTax), class: NumberFormatService.getColorClass(effLTax)},
    totalTax: { val: NumberFormatService.toCurrency(totalTax), class: NumberFormatService.getColorClass(totalTax)},
})

export function financeCalcTax(gIncome) {
  return dispatch => {
    var effFITax = gIncome * -.0710
    var effFTax = gIncome * -.0527
    var effSTax = gIncome * -.0316
    var effLTax = gIncome * -.0205
    var totalTax = gIncome * -.1758
    dispatch(financePopTax(effFITax, effFTax, effSTax, effLTax, totalTax))
    
    return totalTax
  }
}
