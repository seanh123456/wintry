export const FIRE_GREETING_BEGIN = 'FIRE_GREETING_BEGIN'
export const FIRE_GREETING_SUCCESS = 'FIRE_GREETING_SUCCESS'
export const FIRE_GREETING_FAILURE = 'FIRE_GREETING_FAILURE'

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
    income1: income1,
    gIncome: toCurrency(toNumber(income1)),
    effFTax: toCurrency(toNumber(income1 * .20)),
    effSTax: toCurrency(toNumber(income1 * .08)),
    effLTax: toCurrency(toNumber(income1 * .03)),
    nIncome: toCurrency(toNumber(income1 * .69))
})

export const fireEditIncome = income1 => ({
    type: FIRE_UPDATE_INCOME,
    income1: income1 === '' ? '' : toNumber(income1)
})

export const fireFormatIncome = income1 => ({
    type: FIRE_UPDATE_INCOME,
    income1: toCurrency(toNumber(income1)),
    gIncome: toCurrency(toNumber(income1)),
    effFTax: toCurrency(toNumber(income1 * .20)),
    effSTax: toCurrency(toNumber(income1 * .08)),
    effLTax: toCurrency(toNumber(income1 * .03)),
    nIncome: toCurrency(toNumber(income1 * .69))
})

export function fetchFireGreeting() {
  return dispatch => {
    dispatch(fetchFireGreetingBegin())
    return fetch("/api/fire/")
      .then(handleErrors)
      .then(res => res.json())
      .then((json) => {
        dispatch(fetchFireGreetingSuccess(json.message))
        return json.message
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
