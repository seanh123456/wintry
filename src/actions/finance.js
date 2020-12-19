export const FINANCE_GREETING_BEGIN = 'FINANCE_GREETING_BEGIN'
export const FINANCE_GREETING_SUCCESS = 'FINANCE_GREETING_SUCCESS'
export const FINANCE_GREETING_FAILURE = 'FINANCE_GREETING_FAILURE'

export const FINANCE_EDIT_INCOME = 'FINANCE_EDIT_INCOME'
export const FINANCE_UPDATE_INCOME = 'FINANCE_UPDATE_INCOME'

export const fetchFinanceGreetingBegin = () => ({
  type: FINANCE_GREETING_BEGIN
})

export const fetchFinanceGreetingSuccess = message => ({
    type: FINANCE_GREETING_SUCCESS,
    payload: { message }
})

export const fetchFinanceGreetingFailure = error => ({
    type: FINANCE_GREETING_FAILURE,
    payload: { error }
})

export const financeUpdateIncome = income1 => ({
    type: FINANCE_UPDATE_INCOME,
    income1: { val: income1, class: getColorClass(income1)},
    gIncome: { val: toCurrency(income1), class: getColorClass(income1) },
    effFITax: { val: toCurrency(income1 * -.0710), class: getColorClass(income1 * -.0710) },
    effFTax: { val: toCurrency(income1 * -.0527), class: getColorClass(income1 * -.0527) },
    effSTax: { val: toCurrency(income1 * -.0316), class: getColorClass(income1 * -.0316) },
    effLTax: { val: toCurrency(income1 * -.0205), class: getColorClass(income1 * -.0205) },
    nIncome: { val: toCurrency(income1 * (1-.1237-.0316-.0205)), class: getColorClass(income1 * (1-.1237-.0316-.0205)) }
})

export const financeEditIncome = income1 => ({
    type: FINANCE_EDIT_INCOME,
    income1: { val: (income1 === '' || toNumber(income1) == '0') ? '' : toNumber(income1), class: getColorClass(toNumber(income1))},
})

export const financeFormatIncome = income1 => ({
    type: FINANCE_UPDATE_INCOME,
    income1: { val: toCurrency(income1), class: getColorClass(income1) },
    gIncome: { val: toCurrency(income1), class: getColorClass(income1) },
    effFITax: { val: toCurrency(income1 * -.0710), class: getColorClass(income1 * -.0710) },
    effFTax: { val: toCurrency(income1 * -.0527), class: getColorClass(income1 * -.0527) },
    effSTax: { val: toCurrency(income1 * -.0316), class: getColorClass(income1 * -.0316) },
    effLTax: { val: toCurrency(income1 * -.0205), class: getColorClass(income1 * -.0205) },
    nIncome: { val: toCurrency(income1 * (1-.1237-.0316-.0205)), class: getColorClass(income1 * (1-.1237-.0316-.0205)) }
})

export function fetchFinanceGreeting() {
  return dispatch => {
    dispatch(fetchFinanceGreetingBegin())
    return fetch("/api/finance/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchFinanceGreetingSuccess(json.message))
        dispatch(financeFormatIncome(json.income1))
        return json
      })
      .catch(error => dispatch(fetchFinanceGreetingFailure(error)))
  }
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function getColorClass(n) {
  if (n > 0) {
    return "positive"
  } else if (n < 0) {
    return "negative"
  }
}

function toNumber(s) {
  return Number(String(s).replace(/[^0-9.-]+/g,""))
}

function toCurrency(num) {
  var options = {
    maximumFractionDigits : 2,
    currency              : "USD",
    style                 : "currency",
    currencyDisplay       : "symbol"
  }

  return toNumber(num).toLocaleString(undefined, options)
}
