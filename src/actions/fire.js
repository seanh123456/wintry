export const FIRE_GREETING_BEGIN = 'FIRE_GREETING_BEGIN'
export const FIRE_GREETING_SUCCESS = 'FIRE_GREETING_SUCCESS'
export const FIRE_GREETING_FAILURE = 'FIRE_GREETING_FAILURE'

export const FIRE_EDIT_INCOME = 'FIRE_EDIT_INCOME'
export const FIRE_UPDATE_INCOME = 'FIRE_UPDATE_INCOME'

export const fetchFireGreetingBegin = () => ({
  type: FIRE_GREETING_BEGIN
})

export const fetchFireGreetingSuccess = message => ({
    type: FIRE_GREETING_SUCCESS,
    payload: { message }
})

export const fetchFireGreetingFailure = error => ({
    type: FIRE_GREETING_FAILURE,
    payload: { error }
})

export const fireUpdateIncome = income1 => ({
    type: FIRE_UPDATE_INCOME,
    income1: { val: income1, class: getColorClass(income1)},
    gIncome: { val: toCurrency(income1), class: getColorClass(income1) },
    effFITax: { val: toCurrency(income1 * -.0710), class: getColorClass(income1 * -.0710) },
    effFTax: { val: toCurrency(income1 * -.0527), class: getColorClass(income1 * -.0527) },
    effSTax: { val: toCurrency(income1 * -.0316), class: getColorClass(income1 * -.0316) },
    effLTax: { val: toCurrency(income1 * -.0205), class: getColorClass(income1 * -.0205) },
    nIncome: { val: toCurrency(income1 * (1-.1237-.0316-.0205)), class: getColorClass(income1 * (1-.1237-.0316-.0205)) }
})

export const fireEditIncome = income1 => ({
    type: FIRE_EDIT_INCOME,
    income1: { val: (income1 === '' || toNumber(income1) == '0') ? '' : toNumber(income1), class: getColorClass(toNumber(income1))},
})

export const fireFormatIncome = income1 => ({
    type: FIRE_UPDATE_INCOME,
    income1: { val: toCurrency(income1), class: getColorClass(income1) },
    gIncome: { val: toCurrency(income1), class: getColorClass(income1) },
    effFITax: { val: toCurrency(income1 * -.0710), class: getColorClass(income1 * -.0710) },
    effFTax: { val: toCurrency(income1 * -.0527), class: getColorClass(income1 * -.0527) },
    effSTax: { val: toCurrency(income1 * -.0316), class: getColorClass(income1 * -.0316) },
    effLTax: { val: toCurrency(income1 * -.0205), class: getColorClass(income1 * -.0205) },
    nIncome: { val: toCurrency(income1 * (1-.1237-.0316-.0205)), class: getColorClass(income1 * (1-.1237-.0316-.0205)) }
})

export function fetchFireGreeting() {
  return dispatch => {
    dispatch(fetchFireGreetingBegin())
    return fetch("/api/fire/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchFireGreetingSuccess(json.message))
        dispatch(fireFormatIncome(json.income1))
        return json
      })
      .catch(error => dispatch(fetchFireGreetingFailure(error)))
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
