class NumberFormatService {
  getColorClass(n) {
    if (n > 0) {
      return "positive"
    } else if (n < 0) {
      return "negative"
    }
  }

  toNumber(s) {
    return Number(String(s).replace(/[^0-9.-]+/g,""))
  }

  toCurrency(num) {
    var options = {
      maximumFractionDigits : 2,
      currency              : "USD",
      style                 : "currency",
      currencyDisplay       : "symbol"
    }

    return this.toNumber(num).toLocaleString(undefined, options)
  }
}

export default new NumberFormatService()
