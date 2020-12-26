import NumberFormatService from '../service/NumberFormatService'

export const FINANCE_EDIT_INCOME = 'FINANCE_EDIT_INCOME'
export const FINANCE_UPDATE_INCOME = 'FINANCE_UPDATE_INCOME'

export const financeEditIncome = income1 => ({
    type: FINANCE_EDIT_INCOME,
    income1: {
      val: (income1 === '' || NumberFormatService.toNumber(income1) === 0) ? '' : NumberFormatService.toNumber(income1),
      class: NumberFormatService.getColorClass(NumberFormatService.toNumber(income1))
    },
})

export const financeUpdateIncome = income1 => ({
    type: FINANCE_UPDATE_INCOME,
    income1: { val: income1, class: NumberFormatService.getColorClass(income1)},
})

export const financeFormatIncome = income1 => ({
    type: FINANCE_UPDATE_INCOME,
    income1: { val: NumberFormatService.toCurrency(income1), class: NumberFormatService.getColorClass(income1) },
})
